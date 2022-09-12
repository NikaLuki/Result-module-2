import React from 'react';

const BookMark = ({ status, onToggleBookMark, id }) => {
  return (
    <i
      className={'bi bi-heart' + (status ? '-fill' : '')}
      onClick={() => onToggleBookMark(id)}
    ></i>
  );
};

export default BookMark;
