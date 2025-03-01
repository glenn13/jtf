import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface ClientDataInterface {
  user: any;
}

const initialState: ClientDataInterface = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") || "") : null,
};

const ClientDataSlice = createSlice({
  name: "ClientDataSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserData } = ClientDataSlice.actions;

export default ClientDataSlice.reducer;
