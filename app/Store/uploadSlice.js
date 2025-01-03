import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isloading: false,
  submitted: false,
};

export const uploadUts = createAsyncThunk(
  "/api/upload",
  async ({
    qrCodeImage,
    stationName,
    description,
    uploaderName,
    uploader,
    state,
  }) => {
    const newStation = stationName.toLowerCase().trim();
    try {
      const result = await axios.post(
        "https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/upload/uploadqr",
        {
          qrCodeImage,
          stationName: newStation,
          description,
          uploader,
          uploaderName,
          state,
        },
        { withCredentials: true }
      );
      return result?.data;
    } catch (error) {
      return error?.response;
    }
  }
);

export const viewBySearch = createAsyncThunk(
  "api/view",
  async ({ stationName }) => {
    try {
      const result = await axios.get(
        `https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/viewqr/searchQrCode`,
        {
          params: { stationName }, // Pass stationName as query params
        }
      );
      return result?.data;
    } catch (error) {
      return (
        error?.response?.data || {
          success: false,
          message: "An error occurred.",
        }
      );
    }
  }
);

export const fetchStationDetails = createAsyncThunk(
  "station/fetchDetails",
  async ({id}) => {
    try {
      const result = await axios.get(
        `https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/viewqr/station/${id}`,
        { params: {id} }
      );
      return result.data;
    } catch (error) {
      return (
        error?.response?.data || {
          success: false,
          message: "An error occurred.",
        }
      );
    }
  }
);


const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(uploadUts.pending, (state) => {
        state.isloading = true;
      })
      .addCase(uploadUts.fulfilled, (state) => {
        state.isloading = false;
        state.submitted = true;
      })
      .addCase(uploadUts.rejected, (state) => {
        state.isloading = false;
        state.submitted = false;
      })
      .addCase(viewBySearch.pending, (state) => {
        state.isloading = true;
      })
      .addCase(viewBySearch.fulfilled, (state) => {
        state.isloading = false;
      })
      .addCase(viewBySearch.rejected, (state) => {
        state.isloading = false;
      })
      .addCase(fetchStationDetails.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchStationDetails.fulfilled, (state, action) => {
        state.isloading = false;
        state.stationDetails = action.payload;
      })
      .addCase(fetchStationDetails.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
      });
  },
});


export default uploadSlice.reducer;
