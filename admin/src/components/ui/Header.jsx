import React from 'react';

const Header = ({ name, children }) => {
  return (
    <div className='bg-gray-100 p-3 flex justify-between items-center'>
      <p className='text-lg font-semibold'>{name}</p>
      {children && <div>{children}</div>}
    </div>
  );
};

export default Header;
