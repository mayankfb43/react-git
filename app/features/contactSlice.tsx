import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the slice state
interface ContactState {
  contacts: [];
  contact: {};
}

// Define the initial state using that type
const initialState: ContactState = {
  contacts: [],
  contact: {},
};

export const fetchContacts = createAsyncThunk<void, void>(
  "contact/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);
export const fetchContact = createAsyncThunk(
  "contact/fetchUsers",
  async ({ id }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.payload);
    }
  }
);

export const saveContact = createAsyncThunk(
  "contact/fetchUsers",
  async ({ id, payload }: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          ...payload,
        }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.payload);
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
  },
});

export const selectContacts = (state: RootState) => state.contact.contacts;

export default contactSlice.reducer;
