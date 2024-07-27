// AccessDenied.js
import React from 'react';
import block from '../assets/block.png';
const AccessDenied = () => {
  return (
    <div>
      <img src={block} alt="Access Denied" />
      <p>Bu sayfaya erişiminiz kısıtlanmıştır.</p>
    </div>
  );
};

export default AccessDenied;
