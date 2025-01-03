"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./store.js";
import { authUser } from "./authSlice.js";
import { useRouter } from "next/navigation.js";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(authUser()).then((result) => {
     });
  }, [dispatch, router.pathname]); // Re-run when the route changes

  return null;
};

const SliceProvier = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <AuthInitializer />
    </Provider>
  );
};

export default SliceProvier;
