import { createSlice } from "@reduxjs/toolkit";
const initialinfo = {
  filteredInfo: {
    searchBarValue: "",
    categorie: "",
    priceFrom: "",
    priceTo: "",
    sortBy: "Price, high to low",
    page: 1,
    checkboxes: "",
  },
};

export const filteredInfoSlice = createSlice({
  name: "filteredInfo",
  initialState: initialinfo,
  reducers: {
    changeSearchBarValue: (state, action) => {
      state.filteredInfo = {
        ...state.filteredInfo,
        categorie: "",
        priceFrom: "",
        priceTo: "",
        sortBy: "Price, high to low",
        checkboxes: "",
        searchBarValue: action.payload,
        page: 1,
      };
    },
    changeCategory: (state, action) => {
      state.filteredInfo = {
        ...state.filteredInfo,
        categorie: action.payload,
        page: 1,
        searchBarValue: "",
      };
    },
    changePriceFrom: (state, action) => {
      state.filteredInfo = {
        ...state.filteredInfo,
        priceFrom: action.payload,
        page: 1,
        searchBarValue: "",
      };
    },
    changePriceTo: (state, action) => {
      state.filteredInfo = {
        ...state.filteredInfo,
        priceTo: action.payload,
        page: 1,
        searchBarValue: "",
      };
    },
    changeSortBy: (state, action) => {
      state.filteredInfo = {
        ...state.filteredInfo,
        sortBy: action.payload,
        page: 1,
        searchBarValue: "",
      };
    },

    changePage: (state, action) => {
      state.filteredInfo = {
        ...state.filteredInfo,
        page: action.payload,
      };
    },

    changeCheckBoxes: (state, action) => {
      state.filteredInfo = {
        ...state.filteredInfo,
        checkboxes: action.payload,
      };
    },
  },
});

export const {
  changeCategory,
  changeCheckBoxes,
  changePage,
  changePriceFrom,
  changePriceTo,
  changeSortBy,
  changeSearchBarValue,
} = filteredInfoSlice.actions;
export default filteredInfoSlice.reducer;
