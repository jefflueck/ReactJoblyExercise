import React from 'react';

const SearchForm = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  };

  return (
    <div className="SearchForm mb-4">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg flex-grow-1"
          name="searchTerm"
          placeholder="Enter search term..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="btn btn-lg btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;
