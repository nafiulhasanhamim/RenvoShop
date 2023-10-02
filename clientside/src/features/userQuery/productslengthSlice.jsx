import { createSlice } from "@reduxjs/toolkit";
const initialinfo = {
  productsLength: {
    length: 0,
  },
};

export const productsLengthSlice = createSlice({
  name: "producsLength",
  initialState: initialinfo,
  reducers: {
    productsLength: (state, action) => {
      //   const info = JSON.parse(localStorage.getItem("cartproducts"));
      //   console.log(info);
      //   console.log(info);
      //   if (info !== null) {
      //     state.cartinfo = { length: info.length };
      //   } else {
      //     state.cartinfo = { length: 0 };
      //   }
      state.productsLength = { length: action.payload };
    },
  },
});

export const { productsLength } = productsLengthSlice.actions;
export default productsLengthSlice.reducer;
