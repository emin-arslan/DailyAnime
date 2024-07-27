// AccessDenied.js
import React from 'react';
import block from '../assets/block.png';
const AccessDenied = () => {
  return (
    <div className='bg-[#ededed] w-screen h-screen'>
      <img src={block} alt="Access Denied" className='w-auto h-screen mx-auto' />
    </div>
  );
};

export default AccessDenied;
