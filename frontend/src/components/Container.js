import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="flex min-h-[calc(100vh-64px)]  mx-auto w-5/6 ">
      {children}
    </div>
  );
}

export default Container;
