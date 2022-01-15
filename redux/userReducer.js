const initState = {
	user_email: '',
	is_logged_in: null,
	loggedInUserData: null
}

const userReducer = (state = initState, action) =>  {
  switch(action.type){
		case 'STORE_EMAIL':
			return{
				...state,
				user_email: action.payload
			}
		case 'LOGGED_IN':
			return{
				...state,
				is_logged_in: action.payload
			}
		case 'POPULATE_USER_DATA':
			return{
				...state,
				loggedInUserData: action.payload
			}
    default:
  	  return state
  }
}

export default userReducer