import React from 'react';

const InternetError = () => {
  return (
    <div className="flex items-center justify-center text-red-500 ">
      <div className=" p-8 shadow-lg max-w-sm w-full border border-solid border-red-500 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Internet Connection Error</h2>
        <p className=" mb-4">Please check your internet connection and try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default InternetError;
