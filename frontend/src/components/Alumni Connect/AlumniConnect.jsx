import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './alumniconnect.css'; // Ensure this path is correct

const AlumniConnect = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/alumni'); // Update with your API endpoint
        setAlumni(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load alumni.');
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <div className="alumni-connect">
      <div className="info-cards">
        <div className="info-card">
          <div className="icon">🔍</div>
          <div className="text">
            <h3>Find Alumni</h3>
            <p>Search for alumni based on your university or other criteria.</p>
          </div>
        </div>
        <div className="info-card">
          <div className="icon">📩</div>
          <div className="text">
            <h3>Request Referrals</h3>
            <p>Request job referrals from alumni who are in your field of interest.</p>
          </div>
        </div>
        <div className="info-card">
          <div className="icon">🗣️</div>
          <div className="text">
            <h3>Get Guidance</h3>
            <p>Receive career guidance and mentorship from experienced alumni.</p>
          </div>
        </div>
        <div className="info-card">
          <div className="icon">📚</div>
          <div className="text">
            <h3>Access Resources</h3>
            <p>Get access to study materials and other resources shared by alumni.</p>
          </div>
        </div>
      </div>
      <div className="interactions">
        <h2>Interact with Alumni</h2>
        {loading && <p>Loading alumni...</p>}
        {error && <p className="error">{error}</p>}
        <div className="alumni-list">
          {!loading && !error && alumni.map((alumnus) => (
            <div key={alumnus.id} className="alumni-card">
              <div className="card-header">{alumnus.name}</div>
              <div className="card-content">
                <p>{alumnus.degree} - {alumnus.university}</p>
                <button>Contact</button>
              </div>
            </div>
          ))}
        </div>
        <div className="resource-section">
          <h2>Share Resources</h2>
          <input type="text" placeholder="Add a new resource..." />
          <button>Add Resource</button>
        </div>
        <div className="guidance-section">
          <h2>Request Guidance</h2>
          <textarea placeholder="Ask your question or request guidance..." />
          <button>Submit Request</button>
        </div>
      </div>
    </div>
  );
};

export default AlumniConnect;
