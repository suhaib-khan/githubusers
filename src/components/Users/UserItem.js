import React from 'react';
import { useHistory } from 'react-router-dom';

const UserItem = ({ user, isDelete, userNames, setUserNames }) => {
  const history = useHistory();

  const userItemHandler = (userName) => {
    history.push(`/users/${userName}`);
  };

  const checkboxHandler = (e, username) => {
    if (e.target.checked) {
      if (!userNames.includes(username)) {
        setUserNames([...userNames, username]);
      }
    } else {
      const selectedUsers = [...userNames];
      const updatedUsers = selectedUsers?.filter((user) => user !== username);
      setUserNames(updatedUsers);
    }
  };

  return (
    <>
      <div className='user_item'>
        <img
          src={user.avatar_url}
          alt={user.login}
          onClick={() => userItemHandler(user.login)}
        />
        <div className='username' onClick={() => userItemHandler(user.login)}>
          {user.login}
        </div>
        {isDelete && (
          <div className='user_check'>
            <input
              type='checkbox'
              onChange={(e) => checkboxHandler(e, user.login)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UserItem;
