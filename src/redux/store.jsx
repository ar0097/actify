import { configureStore } from "@reduxjs/toolkit";
import detailReducer from "./slice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("contactsState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("contactsState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    details: detailReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    details: store.getState().details,
  });
});

export default store;
