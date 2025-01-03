import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
};

export const registerUser = createAsyncThunk(
  "api/auth/register",

  async ({ username, email, password }) => {
    try {
      const result = await axios.post(
        "https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/auth/register",
        { username, email, password },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const otpVerify = createAsyncThunk(
  "api/otpverify",
  async ({ code, otpEmail }) => {
    try {
      const result = await axios.post("https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/auth/verify", {
        code,
        email: otpEmail,
      });
      return result?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const resendOtp = createAsyncThunk(
  "api/otpverifyAgain",
  async ({ email }) => {
    try {
      const result = await axios.post("https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/auth/otp", {
        email,
      });
      return result?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const loginUser = createAsyncThunk(
  "/api/login",
  async ({ email, password }) => {
    try {
      const result = await axios.post(
        "https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const authUser = createAsyncThunk("/auth/user", async () => {
  try {
    const result = await axios.get("https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/auth/auth-user",{withCredentials: true}, {
      headers: {
        "Cache-Control": "no-cache no-store must-revalidate proxy-revalidate",
      },
    });
    return result?.data;
  } catch (error) {
    return error.response?.data;
  }
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const ForgetPassword = createAsyncThunk(
  "api/forget",
  async ({ email, code }) => {
    try {
      const result = await axios.post(
        "https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/auth/forgot-password",
        { email, code },
        { withCredentials: true }
      );
      return result?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const changePassword = createAsyncThunk(
  "api/forget",
  async ({ oldPassword, newPassword }) => {
    try {
      const result = await axios.post(
        "https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/user/change-password",
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      return result?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo(state, action) { },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action?.payload?.success ? true : false;
        state.user = action?.payload?.success ? action?.payload?.data : null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action?.payload?.success;
        state.user = action?.payload?.success ? action?.payload?.user : null;
      })
      .addCase(authUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(ForgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ForgetPassword.fulfilled, (state) => {
        state.isLoading = true;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(ForgetPassword.rejected, (state) => {
        state.isLoading = true;
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
