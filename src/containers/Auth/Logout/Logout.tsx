import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../../../features/authSlice";
import { useAppDispatch } from "../../../app/hooks";

const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return <Navigate to="/auth" />;
};

export default Logout;
