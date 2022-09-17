import React from 'react';
import Users from './users';

const Table = ({ users, onDelete, onToggleBookMark }) => {
  return (
    <>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качество</th>
              <th scope="col">Проффессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"> Избранное</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <Users
              users={users}
              onDelete={onDelete}
              onToggleBookMark={onToggleBookMark}
            />
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
