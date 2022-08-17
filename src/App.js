import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [isSend, setIsSend] = React.useState(false);

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => {
        console.warn(err);
        alert('Error while getting data!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    invites.includes(id)
      ? setInvites((prev) => prev.filter((_id) => _id !== id))
      : setInvites((prev) => [...prev, id]);
  };

  const onClickSend = () => {
    setIsSend(true);
  };

  const count = invites.length;

  return (
    <div className="App">
      {isSend ? (
        <Success count={count} />
      ) : (
        <Users
          items={users}
          invites={invites}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          onClickInvite={onClickInvite}
          onClickSend={onClickSend}
          count={count}
        />
      )}
    </div>
  );
}

export default App;
