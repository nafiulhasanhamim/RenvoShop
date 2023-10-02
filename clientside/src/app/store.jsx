import { configureStore } from "@reduxjs/toolkit";
import { signinupQuery } from "../features/userQuery/signinupQuery";
import userinfoReducer from "../features/userQuery/userinfoSlice";
import cartinfoReducer from "../features/userQuery/cartinfoSlice";
import productsLengthReducer from "../features/userQuery/productslengthSlice";
import filteredInfoReducer from "../features/userQuery/filteredOptionsSlice";
import roleinfoReducer from "../features/userQuery/roleSlice";
import postReducer from "../features/userQuery/postSlice";
import { categorieQuery } from "../features/adminQuery/categorieQuery";
import { productsQuery } from "../features/adminQuery/productsQuery";
import { userhandlingQuery } from "../features/adminQuery/userhandlingQuery";
import { recoverPasswordQuery } from "../features/userQuery/recoverPasswordQuery";
export const store = configureStore({
  reducer: {
    //posts: postReducer,
    userinfo: userinfoReducer,
    roleinfo: roleinfoReducer,
    filteredInfo: filteredInfoReducer,
    cartinfo: cartinfoReducer,
    productsInfo: productsLengthReducer,
    [signinupQuery.reducerPath]: signinupQuery.reducer,
    [categorieQuery.reducerPath]: categorieQuery.reducer,
    [productsQuery.reducerPath]: productsQuery.reducer,
    [userhandlingQuery.reducerPath]: userhandlingQuery.reducer,
    [recoverPasswordQuery.reducerPath]: recoverPasswordQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      signinupQuery.middleware,
      categorieQuery.middleware,
      productsQuery.middleware,
      userhandlingQuery.middleware,
      recoverPasswordQuery.middleware,
    ]),
});
