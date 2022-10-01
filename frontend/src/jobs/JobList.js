import React, { useState, useEffect } from 'react';
import Search from '../common/SearchForm';
import JoblyApi from '../api/api';
import JobCardList from './JobCardList';

const JobList = () => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    search();
  }, []);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) return <p>Loading...</p>;

  return (
    <div className="JobList col-md-8 offset-md-2">
      <Search searchFor={search} />
      {jobs.length ? (
        <div>
          <JobCardList jobs={jobs} />
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
};

export default JobList;
