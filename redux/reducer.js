const initState = {
    history: [],
    isReminderOn: false,
}

const appReducer = (state = initState, action) =>  {
    switch(action.type){
        case 'REMINDER':
            return{
                ...state,
                isReminderOn: action.payload
            }
        case 'HISTORY':
            return{
                ...state,
                history: action.payload
            }

        case 'CLEAR_HISTORY':
            return{
                history: [],
                isReminderOn: false
            }
        default:
            return state
    }
}

export default appReducer