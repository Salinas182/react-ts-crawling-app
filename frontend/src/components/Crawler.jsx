import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Crawler = () => {
  const [jobs, setJobs] = useState([]);
  const [targetUrl, setTargetUrl] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    if (!token) {
      return;
    }

    fetchJobs();
  }, [token]);

  const handleCreateJob = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/jobs`,
        { targetUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs([...jobs, data]);
      setTargetUrl('');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        placeholder="https://elpais.com"
      />
      <button
        onClick={handleCreateJob}
        disabled={!targetUrl.trim()}
      >
        Crawl this URL
      </button>

      {jobs?.length > 0 && (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>{job.targetUrl}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Crawler;
