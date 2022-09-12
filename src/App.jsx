import React from 'react';
import api from './api';
import SearchStatus from './components/searchStatus';
import Users from './components/users';

const App = () => {
  const [users, setUsers] = React.useState(api.users.fetchAll());
  const handleDelete = userId => {
    setUsers(users.filter(user => user._id !== userId));
  };
  const handleToggleBookMark = id => {
    setUsers(
      users.map(user =>
        user._id === id ? ((user.bookmark = !user.bookmark), user) : user,
      ),
    );
  };

  return (
    <>
      <SearchStatus usersCount={users.length} />
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
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          </tbody>
        </table>
      )}
    </>
  );
};

export default App;
