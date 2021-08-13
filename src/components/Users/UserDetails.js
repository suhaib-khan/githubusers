import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserActions from './store/action';

const UserDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  //state
  const [user, setUser] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  //store
  const { isUserGetRequest, isUserGetSuccess, isUserGetError, userDetails } =
    useSelector((store) => ({
      isUserGetRequest: store.userReducer.isUserGetRequest,
      isUserGetSuccess: store.userReducer.isUserGetSuccess,
      isUserGetError: store.userReducer.isUserGetError,
      userDetails: store.userReducer.userDetails,
    }));

  // if the user exit in local storage then get it
  useEffect(() => {
    const offlineUsersWithDetails =
      JSON.parse(localStorage.getItem('offline_users_with_details')) || [];
    const isUserAlreadyExist =
      offlineUsersWithDetails?.filter((user) => user.login === params.username)
        ?.length === 1;

    if (isUserAlreadyExist) {
      const user = offlineUsersWithDetails.find(
        (offlineUser) => offlineUser.login === params.username
      );
      setUser(user);
    } else {
      // if the user does not exist in local storage then fetch is from github
      params && dispatch(UserActions.getUserDetails(params.username));
    }
  }, [params, dispatch]);

  // get details of a user
  useEffect(() => {
    return () => {
      dispatch(UserActions.resetUser());
    };
  }, [dispatch]);

  // setting user
  useEffect(() => {
    if (isUserGetSuccess && userDetails) {
      setUser(userDetails);
      const offlineUsersWithDetails =
        JSON.parse(localStorage.getItem('offline_users_with_details')) || [];

      const isUserAlreadyExist =
        offlineUsersWithDetails?.filter((user) => user.id === userDetails.id)
          ?.length === 1;
      if (!isUserAlreadyExist) {
        const users = [...offlineUsersWithDetails, userDetails];
        localStorage.setItem(
          'offline_users_with_details',
          JSON.stringify(users)
        );
      }
    }
  }, [isUserGetSuccess, userDetails]);

  // edit button handler
  const editHandler = () => {
    setIsEdit(true);
  };

  // input handler
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //update handler
  const updateHandler = () => {
    const users = JSON.parse(
      localStorage.getItem('offline_users_with_details')
    );
    const userIndex = users.findIndex(
      (offlineUser) => offlineUser.id === user.id
    );
    users[userIndex] = user;
    localStorage.setItem('offline_users_with_details', JSON.stringify(users));
    setIsEdit(false);
  };

  const cancelHandler = () => {
    setIsEdit(false);
  };

  return (
    <>
      {isUserGetRequest && (
        <div>`Please wait while we are fetching the details for you.`</div>
      )}
      {isUserGetError && (
        <div>Something went wrong while fetching this user. </div>
      )}
      {user && (
        <div className='user_details_wrapper'>
          <div className='user_image'>
            <img src={user?.avatar_url} alt={user?.name} />
          </div>
          <div className='user_details'>
            <div>
              <span>Name:</span>
              {isEdit ? (
                <input
                  value={user?.name || ''}
                  onChange={inputHandler}
                  name='name'
                />
              ) : (
                <span>{user?.name || 'NA'}</span>
              )}
            </div>
            <div>
              <span>Email:</span>
              {isEdit ? (
                <input
                  value={user?.email || ''}
                  onChange={inputHandler}
                  name='email'
                />
              ) : (
                <span>{user?.email || 'NA'}</span>
              )}
            </div>
            <div>
              <span>Location:</span>
              {isEdit ? (
                <input
                  value={user?.location || ''}
                  onChange={inputHandler}
                  name='location'
                />
              ) : (
                <span>{user?.location || 'NA'}</span>
              )}
            </div>
            <div>
              <span>Company:</span>
              {isEdit ? (
                <input
                  value={user?.company || ''}
                  onChange={inputHandler}
                  name='company'
                />
              ) : (
                <span>{user?.company || 'NA'}</span>
              )}
            </div>
            <div>
              <span>Twitter:</span>
              {isEdit ? (
                <input
                  value={user?.twitter_username || ''}
                  onChange={inputHandler}
                  name='twitter_username'
                />
              ) : (
                <span>{user?.twitter_username || 'NA'}</span>
              )}
            </div>
            <div>
              <span>Blog:</span>
              {isEdit ? (
                <input
                  value={user?.blog || ''}
                  onChange={inputHandler}
                  name='blog'
                />
              ) : (
                <span>{user?.blog || 'NA'}</span>
              )}
            </div>
            <div>
              <span>Bio:</span>
              {isEdit ? (
                <input
                  value={user?.bio || ''}
                  onChange={inputHandler}
                  name='bio'
                />
              ) : (
                <span>{user?.bio || 'NA'}</span>
              )}
            </div>
            <div>
              <span>Followers:</span>
              {isEdit ? (
                <input
                  value={user?.followers || ''}
                  onChange={inputHandler}
                  name='followers'
                />
              ) : (
                <span>{user?.followers || 'NA'}</span>
              )}
            </div>
            <div>
              <span>Following:</span>
              {isEdit ? (
                <input
                  value={user?.following || ''}
                  onChange={inputHandler}
                  name='following'
                />
              ) : (
                <span>{user?.following || 'NA'}</span>
              )}
            </div>
            <div>
              <span>Repos:</span>
              {isEdit ? (
                <input
                  value={user?.public_repos || ''}
                  onChange={inputHandler}
                  name='public_repos'
                />
              ) : (
                <span>{user?.public_repos || 'NA'}</span>
              )}
            </div>
            <div>
              <span>Repo URL:</span>
              {isEdit ? (
                <input
                  value={user?.repos_url || ''}
                  onChange={inputHandler}
                  name='repos_url'
                />
              ) : (
                <span>{user?.repos_url || 'NA'}</span>
              )}
            </div>
          </div>
          <div className='user_edit'>
            {isEdit ? (
              <>
                <button onClick={updateHandler}>Update</button>{' '}
                <button onClick={cancelHandler}>Cancel</button>
              </>
            ) : (
              <button onClick={editHandler}>Edit</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
