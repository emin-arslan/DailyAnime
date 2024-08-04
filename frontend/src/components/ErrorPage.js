import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className='w-full h-[100vh] bg-[#f9f7f7] border flex-col items-center justify-center'>
      <div className='h-5/6 flex-col flex items-center justify-center w-auto align-middle text-center space-y-10'>
        <ul className='w-full items-center text-center h-auto'>
          <li className='text-5xl text-gray-500'>404 ERROR</li>
          <li className='text-xl'>This Page does not exist.</li>
        </ul>
        <div>
          <span>Would you like go to the <Link className='underline text-blue-500' to={'/'}>home page?</Link></span>
        </div>
      </div>
    </div>
  );
};
