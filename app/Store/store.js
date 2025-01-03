const { configureStore } = require("@reduxjs/toolkit");
import authSlice from "./authSlice.js";
import uploadSlice from "./uploadSlice.js";
import viewSlice from "./viewSlice.js";
import adminSlice from './adminSlice.js'
const store = configureStore({
  reducer: {
    auth: authSlice,
    upload: uploadSlice,
    view: viewSlice,
    admin: adminSlice,

  },
});


export default store;