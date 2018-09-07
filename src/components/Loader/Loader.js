import React from 'react';

const Loader = ({ isLoading }) => {
  return isLoading ? <h1>Loading...</h1> : null;
};

export default Loader;
