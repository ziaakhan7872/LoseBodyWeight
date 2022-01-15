export const storeEmail = data => {
  return {
    type: 'STORE_EMAIL',
    payload: data,
  };
};

export const isLoggedin = bool => {
  return {
    type: 'LOGGED_IN',
    payload: bool,
  };
};

export const populateUserData = data => {
  console.log('data=====>', data);
  return {
    type: 'POPULATE_USER_DATA',
    payload: data,
  };
};
