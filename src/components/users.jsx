import React from 'react';
import User from './user.jsx';
const Users = ({ users, onDelete, onToggleBookMark }) => {
  return (
    <>
      {users.map(user => {
        return (
          <User
            key={user._id}
            {...user}
            onDelete={onDelete}
            onToggleBookMark={onToggleBookMark}
          />
        );
      })}
    </>
  );
};

export default Users;
