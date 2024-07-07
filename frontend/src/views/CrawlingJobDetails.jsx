import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Pagination from '../components/PaginationTool';

const CrawlingJobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [urlsPerPage] = useState(10);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId, token]);

  if (!job) {
    return <p>Loading...</p>;
  }

  const totalUrls = job.foundUrls.length;
  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = job.foundUrls.slice(indexOfFirstUrl, indexOfLastUrl);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div style={{ marginLeft: '10px' }}>
        <h1>Crawling Job Details</h1>
        <p>Target URL: {job.targetUrl}</p>
        <h2>Found {totalUrls} URLs:</h2>
      </div>
      <div style={{ maxWidth: '95%', overflowX: 'auto' }}>
        <ul>
          {currentUrls.map((url, index) => (
            <li key={index} style={{ padding: '5px 0', borderBottom: '1px solid #ccc' }}>
              <span style={{ wordBreak: 'break-all' }}>{url}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Pagination
        urlsPerPage={urlsPerPage}
        totalUrls={totalUrls}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default CrawlingJobDetails;
