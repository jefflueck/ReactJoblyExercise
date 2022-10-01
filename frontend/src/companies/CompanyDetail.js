import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api/api';
import JobCardList from '../jobs/JobCardList';

const CompanyDetail = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      let company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }
    getCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
};

export default CompanyDetail;
