import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddUser = () => {
  const history = useHistory();
  const [user, setUser] = useState({});

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const addNewUserHandler = () => {
    const newUser = {
      ...user,
      id: Math.floor(Math.random() * 900),
      login: user?.name?.split(' ')[0],
      avatar_url: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 900
      )}?v=4`,
    };
    const offlineUsers = JSON.parse(localStorage.getItem('offline_users'));
    if (newUser && newUser.name) {
      const updatedUsers = [...offlineUsers, newUser];
      localStorage.setItem('offline_users', JSON.stringify(updatedUsers));
      history.push('/users');
    }
  };

  return (
    <div className='add_user_wrapper'>
      <div>
        <span>Name:</span>
        <input onChange={inputHandler} value={user.name || ''} name='name' />
      </div>
      <div>
        <span>Email:</span>
        <input onChange={inputHandler} value={user.email || ''} name='email' />
      </div>
      <div>
        <span>Location:</span>
        <input
          onChange={inputHandler}
          value={user.location || ''}
          name='location'
        />
      </div>
      <div>
        <span>Company:</span>
        <input
          onChange={inputHandler}
          value={user.company || ''}
          name='company'
        />
      </div>
      <div>
        <span>Twitter:</span>
        <input
          onChange={inputHandler}
          value={user.twitter_username || ''}
          name='twitter_username'
        />
      </div>
      <div>
        <span>Bio:</span>
        <input onChange={inputHandler} value={user.blog || ''} name='blog' />
      </div>
      <div>
        <span>Blog:</span>
        <input onChange={inputHandler} value={user.bio || ''} name='bio' />
      </div>
      <div>
        <span>Followers:</span>
        <input
          onChange={inputHandler}
          value={user.followers || ''}
          name='followers'
        />
      </div>
      <div>
        <span>Following:</span>
        <input
          onChange={inputHandler}
          value={user.following || ''}
          name='following'
        />
      </div>
      <div>
        <span>Repos:</span>
        <input
          onChange={inputHandler}
          value={user.public_repos || ''}
          name='public_repos'
        />
      </div>
      <div>
        <span>Repo URL:</span>
        <input
          onChange={inputHandler}
          value={user.repos_url || ''}
          name='repos_url'
        />
      </div>
      <button onClick={addNewUserHandler}>Add New User</button>
    </div>
  );
};

export default AddUser;
