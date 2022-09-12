import React from 'react';
import BookMark from './bookmark';
import Qualitie from './qualitie';

const User = props => {
  return (
    <tr key={props._id}>
      <td>{props.name} </td>
      <td>
        {props.qualities.map(qualitie => {
          return <Qualitie key={qualitie._id} {...qualitie} />;
        })}
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate + '/5'}</td>
      <td>
        <BookMark
          status={props.bookmark}
          id={props._id}
          onToggleBookMark={props.onToggleBookMark}
        />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            props.onDelete(props._id);
          }}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
