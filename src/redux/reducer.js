const initialState = {
    ayatTerakhir: null,
    reciter: null
}

const iniReducer = (state = initialState, action) => {
    if (action.type === "USER_INPUT") {
        return {
            ...state,
            ayatTerakhir: action.payload
        };
    }
    if (action.type === "RECITER") {
        return {
            ...state,
            reciter: action.payload
        };
    }
    return state
}

export default iniReducer