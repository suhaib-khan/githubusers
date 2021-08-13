import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from './store/action';
import UserItem from './UserItem';
import { useHistory } from 'react-router-dom';

const List = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // get list of users either from local storage or from api

  useEffect(() => {
    const offlineUsers = JSON.parse(localStorage.getItem('offline_users'));
    const userName = localStorage.getItem('user_name') || 'User';
    offlineUsers && offlineUsers.length > 0 && setUserList(offlineUsers);
    setUserName(userName);
    !offlineUsers && dispatch(UserActions.getUsersList());
  }, [dispatch]);

  //store

  const { isUserListRequest, isUserListSuccess, isUserListError, users } =
    useSelector((store) => ({
      isUserListRequest: store.userReducer.isUserListRequest,
      isUserListSuccess: store.userReducer.isUserListSuccess,
      isUserListError: store.userReducer.isUserListError,
      users: store.userReducer.users,
    }));

  // setting users got from api

  useEffect(() => {
    isUserListSuccess && users?.length && setUserList(users);
  }, [isUserListSuccess, users]);

  //state
  const [userList, setUserList] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [userName, setUserName] = useState('');

  const deleteHandler = () => {
    setIsDelete(true);
  };

  const cancelHandler = () => {
    setIsDelete(false);
  };

  const deleteUsers = () => {
    const offlineUsers = JSON.parse(localStorage.getItem('offline_users'));
    if (offlineUsers.length > 0 && userNames.length > 0) {
      const remainingUsers = offlineUsers.filter(
        (user) => !userNames.includes(user.login)
      );
      localStorage.setItem('offline_users', JSON.stringify(remainingUsers));
      setUserList(remainingUsers);
      setIsDelete(false);
    }
  };

  const addUserHandler = () => {
    history.push('/add-user');
  };

  const logoutHandler = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <div className='buttons_wrapper'>
        <div className='welcome_user'>Welcome {userName}</div>
        <button onClick={logoutHandler}>Logout</button>
        {isDelete ? (
          <>
            {userNames.length > 0 && (
              <button onClick={deleteUsers}>Delete Selected</button>
            )}
            <button onClick={cancelHandler}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={addUserHandler}>Add User</button>
            <button onClick={deleteHandler}>Delete Users</button>
          </>
        )}
      </div>
      <div className='user_list_wrapper'>
        {userList?.map((user) => {
          return (
            <UserItem
              user={user}
              key={user.id}
              userNames={userNames}
              setUserNames={setUserNames}
              isDelete={isDelete}
            />
          );
        })}
        {isUserListRequest && (
          <div>Please wait while we are fetching users for you. </div>
        )}
        {isUserListError && (
          <div>
            Oops! something went wrong while fetching the users, please try
            again.
          </div>
        )}
      </div>
    </>
  );
};

export default List;
