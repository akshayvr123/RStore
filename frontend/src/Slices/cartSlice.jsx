import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtocart: (state,action) => {

       state.cart=action.payload

    },
    removefromcart: (state,action) => {
      state.cart=action.payload
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { addtocart, removefromcart } = cartSlice.actions

export const cartReducer = cartSlice.reducer;