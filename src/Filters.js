import React, { useState } from 'react';

const Filters = ({ setFilters, availableParams }) => {
  const [localFilters, setLocalFilters] = useState({});

  const handleInputChange = (e) => {
    setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setFilters(localFilters);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {availableParams.map(param => (
        <div key={param.name} style={{ marginBottom: '10px' }}>
          <label>{param.name}</label>
          <input
            type="text"
            name={param.name}
            placeholder={`Filter by ${param.name}`}
            value={localFilters[param.name] || ''}
            onChange={handleInputChange}
          />
        </div>
      ))}
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;
