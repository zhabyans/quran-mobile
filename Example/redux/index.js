import React from 'react'
import { Text } from 'react-native'
import { createStore } from 'redux'

// Membuat action types
const types = {
    INCREMENT: 'INCREMENT',
}

// Membuat reducer
const reducer = (state, action) => {
    if (action.type === types.INCREMENT) {
        return { count: state.count + 1 }
    }
    return state
}

// Mendefinisikan initial state dari store
const initialState = { count: 0 }

// Membuat store, menambahkan fungsi reducer dan nilai initial state
const store = createStore(reducer, initialState)

/// Setup Redux telah selesai, berikut cara menggunakannya:
// Lakukan dispatch actions, yang terdaftar pada store/reducer
store.dispatch({ type: types.INCREMENT })
store.dispatch({ type: types.INCREMENT })
store.dispatch({ type: types.INCREMENT })

// Menggunakan store.getState() untuk memperoleh nilai dari object state
export default function App() {
    return (
        <Text style={{ fontSize: 100 }}>
            {store.getState().count}
        </Text>
    )
} 