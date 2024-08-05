import React from 'react';
import Navi from './navi/Navi';
import Footer from './Footer';

const Container = ({ children }) => {
  return (
    <div className="flex-row bg-[#353636] mx-auto w-4/6 xl:w-9/12 lg:w-5/6 md:w-10/12 sm:w-10/12 xs:w-11/12 h-full drop-shadow-xl">
      <Navi/>
      {children}
      <Footer/>
    </div>
  );
}

export default Container;
