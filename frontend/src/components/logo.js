import React from 'react';

const logoImage = './static/images/logo.svg';

class Logo extends React.Component {
  render() {
    const getDataHeader = {
      color: 'blue',
      fontSize: '8px',
      margin: '0px',
    };
    return <img src={logoImage}
alt="GET Protocol Community" />;
  }
}

export default Logo;
