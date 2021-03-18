import React from "react";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

export default function index() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
