const initialState = {
    ayatTerakhir: null,
    reciter: null
}

export const user = (state = initialState, action) => {
    if (action.type === "USER_INPUT") {
        console.log('gerak');
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