export const reminder = (bool) => {
  return {
    type: 'REMINDER',
    payload: bool
  }
}

export const historyData = (h_data) => {
  return {
    type: 'HISTORY',
    payload: h_data
  };
}

export const clearHistory = () => {
  return{
    type: 'CLEAR_HISTORY',
  }
}