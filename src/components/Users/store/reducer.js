const initialState = {
  isUserListRequest: false,
  isUserListSuccess: false,
  isUserListError: false,
  users: [],

  isUserGetRequest: false,
  isUserGetSuccess: false,
  isUserGetError: false,
  userDetails: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case `GET_USERS_REQUEST`:
      return {
        ...state,
        isUserListRequest: true,
      };
    case `GET_USERS_SUCCESS`:
      return {
        ...state,
        isUserListRequest: false,
        isUserListSuccess: true,
        users: action.payload,
      };
    case `GET_USERS_ERROR`:
      return {
        ...state,
        isUserListRequest: false,
        isUserListSuccess: false,
        isUserListError: true,
        users: [],
      };

    case `GET_USER_DETAILS_REQUEST`:
      return {
        ...state,
        isUserGetRequest: true,
        userDetails: '',
      };

    case `GET_USER_DETAILS_SUCCESS`:
      return {
        ...state,
        isUserGetRequest: false,
        isUserGetSuccess: true,
        userDetails: action.payload,
      };
    case `GET_USER_DETAILS_ERROR`:
      return {
        ...state,
        isUserGetRequest: false,
        isUserGetError: true,
        userDetails: '',
      };

    case `RESET_USER`:
      return {
        ...state,
        isUserGetRequest: false,
        isUserGetSuccess: false,
        isUserGetError: false,
        user: '',
      };
    default:
      return state;
  }
};
export default userReducer;
