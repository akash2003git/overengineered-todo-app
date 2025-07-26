import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "./store/atoms/authAtom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";

function App() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route */}
          {/*   path="/dashboard" */}
          {/*   element={isAuthenticated ? <DashboardPage /> : <LoginPage />} */}
          {/* /> */}
          <Route
            path="/"
            element={isAuthenticated ? <DashboardPage /> : <LoginPage />}
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
