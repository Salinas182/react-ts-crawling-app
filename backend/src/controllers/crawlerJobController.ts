import { Request, Response } from 'express';
import CrawlerJob from '../models/CrawlerJob';

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

export { createCrawlerJob, getCrawlerJobs };
