import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

// import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
      <Navbar style={{ backgroundColor: '#E9ECEF', position: 'fixed', bottom: 0,width:'100%',borderTop:'1px solid #7B838A',zIndex:100}}>
      <Nav navbar>
        <NavItem>
          Phát triển bởi Đỗ Thắng - Khoa CNTT trường Đại học Công Nghiệp Hà Nội
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
