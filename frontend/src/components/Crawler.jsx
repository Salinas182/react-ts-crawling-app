import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  const handleStartCrawling = async (jobId) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/jobs/${jobId}/start`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const updatedJobs = jobs.map(job =>
        job._id === jobId ? { ...job, status: data.status } : job
      );
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error starting crawling:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        placeholder="https://elpais.com"
        style={{ marginLeft: '10px' }}
      />
      <button
        onClick={handleCreateJob}
        disabled={!targetUrl.trim()}
      >
        Create a crawling job for this URL
      </button>

      {jobs?.length > 0 && (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <Link to={`/jobs/${job._id}`} style={{marginRight: '5px'}}>
                {job.targetUrl}
                <span style={{ fontSize: '12px', marginLeft: '5px', color: '#777' }}>View job details</span>
              </Link>
              <span>
                - Status: {job.status}
              </span>
              <button
                onClick={() => handleStartCrawling(job._id)}
                disabled={job.status !== 'pending'}
                style={{marginLeft: '5px'}}
              >
                Start Crawling
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Crawler;
