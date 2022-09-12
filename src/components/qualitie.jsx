import React from 'react';

const Qualitie = ({ color, name, _id }) => {
  return <span className={'badge bg-' + color + ' m-1'}>{name}</span>;
};

export default Qualitie;
