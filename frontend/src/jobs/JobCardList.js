import React from 'react';
import JobCard from './JobCard';

const JobCardList = ({ jobs, apply }) => {
  return (
    <div className="JobCardList">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} apply={apply} />
      ))}
    </div>
  );
};

export default JobCardList;
