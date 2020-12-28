const initialState = {
  ayatTerakhir: null,
  reciter: null,
};

export const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      ...state,
      ayatTerakhir: action.payload,
    };
  }
  if (action.type === 'RECITER') {
    return {
      ...state,
      reciter: action.payload,
    };
  }
  return state;
};
