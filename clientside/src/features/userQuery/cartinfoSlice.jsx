import { createSlice } from "@reduxjs/toolkit";
const initialinfo = {
  cartinfo: {
    length: 0,
  },
};

export const cartinfoSlice = createSlice({
  name: "cartinfo",
  initialState: initialinfo,
  reducers: {
    cartInfo: (state) => {
      const info = JSON.parse(localStorage.getItem("cartproducts"));
      console.log(info);
      console.log(info);
      if (info !== null) {
        state.cartinfo = { length: info.length };
      } else {
        state.cartinfo = { length: 0 };
      }
    },
  },
});

export const { cartInfo } = cartinfoSlice.actions;
export default cartinfoSlice.reducer;
