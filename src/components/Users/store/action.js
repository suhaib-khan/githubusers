import axios from 'axios';

// get all users
export const getUsersList = () => async (dispatch) => {
  try {
    dispatch({
      type: `GET_USERS_REQUEST`,
    });

    const res = await axios.get(`https://api.github.com/users`);

    if (res.status === 200) {
      const { data } = res;
      localStorage.setItem('offline_users', JSON.stringify(data));
      dispatch({
        type: `GET_USERS_SUCCESS`,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: `GET_USERS_ERROR`,
    });
  }
};

// get user's details
export const getUserDetails = (userName) => async (dispatch) => {
  try {
    dispatch({
      type: `GET_USER_DETAILS_REQUEST`,
    });
    const res = await axios.get(`https://api.github.com/users/${userName}`);
    if (res.status === 200) {
      const { data } = res;
      dispatch({
        type: `GET_USER_DETAILS_SUCCESS`,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: `GET_USER_DETAILS_ERROR`,
    });
  }
};

export const resetUser = () => (dispatch) => {
  dispatch({
    type: `RESET_USER`,
  });
};
