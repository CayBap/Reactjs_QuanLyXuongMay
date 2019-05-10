import { Content } from 'components/Layout';
import React from 'react';
import backgound from '../../assets/background.jpg';
const EmptyLayout = ({ children, ...restProps }) => (
  <main className="cr-app bg-light" style={{

    background: `url(${backgound}) no-repeat center center fixed`, 
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    backgroundSize: 'cover',
  }} {...restProps}>
    <Content fluid onClick={this.handleContentClick}>
      {children}
    </Content>
  </main>
);

export default EmptyLayout;
