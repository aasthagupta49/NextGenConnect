import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="jobs page">
      <div className="container">
        <h1>All Available Jobs</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs by title, category, or country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="banner">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((element) => (
              <div className="card" key={element._id}>
                <p className="job-title">{element.title}</p>
                <p className="job-category">{element.category}</p>
                <p className="job-country">{element.country}</p>
                <Link to={`/job/${element._id}`} className="details-link">Job Details</Link>
              </div>
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
