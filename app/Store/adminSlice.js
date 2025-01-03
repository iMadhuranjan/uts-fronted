import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    qrs: [],
    isLoading: false,
    error: null,
};

// Fetch all users
export const fetchAllUsers = createAsyncThunk("admin/fetchAllUsers", async () => {
    try {
        const response = await axios.get("https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/admin/getalluser", { withCredentials: true });
        return response?.data;
    } catch (error) {
        return (error.response?.data || "Failed to fetch users");
    }
});

// Delete a user by email
export const deleteUser = createAsyncThunk("admin/deleteUser", async (email, { rejectWithValue }) => {
    try {
        const response = await axios.delete("https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/admin/deleteuser", {
            data: { email },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete user");
    }
});

// Fetch unverified QR codes
export const fetchUnverifiedQRCodes = createAsyncThunk("admin/fetchUnverifiedQRCodes", async () => {
    try {
        const response = await axios.get("https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/admin/qrtoverify", { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch unverified QR codes");
    }
});

// Fetch verified QR codes
export const fetchVerifiedQRCodes = createAsyncThunk("admin/fetchVerifiedQRCodes", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/admin/verifiedqrs", { withCredentials: true });
        return response.data.qrtoverify;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch verified QR codes");
    }
});


// Approve a QR code
export const approveQRCode = createAsyncThunk("admin/approveQRCode", async (qrid, { rejectWithValue }) => {
    try {
        const response = await axios.post(`https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/admin/approve/${qrid}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to approve QR code");
    }
});

// Delete a QR codeap
export const deleteQRCode = createAsyncThunk("admin/deleteQRCode", async (qrid, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/admin/delete/${qrid}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete QR code");
    }
});

// Update a QR code
export const updateQRCode = createAsyncThunk("admin/updateQRCode", async ({ qrid, stationName, description, state }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(
            `https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/admin/update/${qrid}`,
            { stationName, description, state },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update QR code");
    }
});


export const fetchQrById = createAsyncThunk("admin/fetchbyid", async ({ qrid }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/admin/getqrbyid/${qrid}`, { withCredentials: true });
        return response.data; // Ensure this matches the backend response format
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch QR code");
    }
});


// Admin slice
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            // Fetch all users
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete user
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = state.users.filter((user) => user.email !== action.meta.arg);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch unverified QR codes
            .addCase(fetchUnverifiedQRCodes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUnverifiedQRCodes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.qrs = action.payload;
            })
            .addCase(fetchUnverifiedQRCodes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch verified QR codes
            .addCase(fetchVerifiedQRCodes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchVerifiedQRCodes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.qrs = action.payload;
            })
            .addCase(fetchVerifiedQRCodes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Approve QR code
            .addCase(approveQRCode.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(approveQRCode.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(approveQRCode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete QR code
            .addCase(deleteQRCode.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteQRCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.qrs = state.qrs.filter((qr) => qr._id !== action.meta.arg);
            })
            .addCase(deleteQRCode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update QR code
            .addCase(updateQRCode.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateQRCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.qrs = action.payload.uts;
            })
            .addCase(updateQRCode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchQrById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchQrById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.qrs = action.payload.uts;
            })
            .addCase(fetchQrById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            ;
    },
});

export default adminSlice.reducer;
