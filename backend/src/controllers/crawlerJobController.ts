import { Request, Response } from 'express';
import CrawlerJob, { ICrawlerJob } from '../models/CrawlerJob';
import axios from 'axios';
import { load } from 'cheerio'; 

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

const createCrawlerJob = async (req: AuthRequest, res: Response) => {
  const { targetUrl } = req.body;
  const userId = req.user?.id;

  try {
    const job = new CrawlerJob({
      userId,
      targetUrl,
      status: 'pending',
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'An unknown error occurred' });
  }
};

const getCrawlerJobs = async (req: AuthRequest, res: Response) => {
  try {
    const jobs = await CrawlerJob.find({ userId: req.user?.id });
    res.status(200).json(jobs);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'An unknown error occurred' });
  }
};

const getJobStatus = async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const job = await CrawlerJob.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'An unknown error occurred' });
  }
};

const startCrawling = async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const job = await CrawlerJob.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.status = 'in-progress';
    await job.save();

    await crawlWebsite(job);
    job.status = 'completed';
    await job.save();

    res.status(200).json(job);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'An unknown error occurred' });
  }
};

const crawlWebsite = async (job: ICrawlerJob) => {
  const visitedUrls = new Set<string>();
  const urlsToVisit: string[] = [job.targetUrl];

  while (urlsToVisit.length > 0) {
    const currentUrl = urlsToVisit.pop();
    if (!currentUrl || visitedUrls.has(currentUrl)) {
      continue;
    }

    visitedUrls.add(currentUrl);

    try {
      const response = await axios.get(currentUrl);
      const dom = load(response.data);

      dom('a[href]').each((_, element) => {
        const url = dom(element).attr('href');

        if (url && !visitedUrls.has(url) && !urlsToVisit.includes(url)) {
          urlsToVisit.push(url);
        }
      });

      job.foundUrls.push(currentUrl);
      await job.save();
      console.log(`Successfully crawled ${currentUrl}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to crawl ${currentUrl}:`, error.message);
      } else {
        console.error(`Failed to crawl ${currentUrl}: An unknown error occurred`);
      }
      await job.save();
    }
  }
};

export { createCrawlerJob, getCrawlerJobs, getJobStatus, startCrawling };
