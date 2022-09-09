import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = userId => {
    setUsers(users.filter(user => user._id !== userId));
  };
  const renderPhrase = number => {
    if (number < 1)
      return (
        <span className="badge bg-danger fs-3">Никто с тобой не тусанет</span>
      );
    else if (number < 5 && number > 1)
      return (
        <span className="badge bg-primary fs-3">
          {number + ' человека тусанут с тобой сегодня'}
        </span>
      );
    else
      return (
        <span className="badge bg-primary fs-3">
          {number + ' человек тусанет с тобой сегодня'}
        </span>
      );
  };
  return (
    <>
      {renderPhrase(users.length)}
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качество</th>
              <th scope="col">Проффессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user._id}>
                  <td>{user.name} </td>
                  <td>
                    {user.qualities.map(qualitie => {
                      return (
                        <span
                          key={qualitie._id}
                          className={'badge bg-' + qualitie.color + ' m-1'}
                        >
                          {qualitie.name}
                        </span>
                      );
                    })}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate + '/5'}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(user._id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
