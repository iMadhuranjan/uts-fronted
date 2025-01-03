import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
};

export const viewProfile = createAsyncThunk("/api/profile", async () => {
  try {
    const data = await axios.get("https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/user/profile", {
      withCredentials: true,
    });
    return data?.data;
  } catch (error) {
    return error?.response;
  }
});

export const updateProfile = createAsyncThunk(
  "/api/profile",
  async (formdata) => {
    try {
      const data = await axios.post(
        "https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/user/profile/",
        formdata,
        {
          withCredentials: true,
        }
      );
      return data?.data;
    } catch (error) {
      return error?.response;
    }
  }
);

export const viewQr = createAsyncThunk("/api/profile", async () => {
  try {
    const data = await axios.get("https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/user/myqr", {
      withCredentials: true,
    });
    return data?.data;
  } catch (error) {
    return error?.response;
  }
});

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(viewProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default viewSlice.reducer;
