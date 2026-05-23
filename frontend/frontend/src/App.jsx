import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Watch from "./pages/Watch";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

      <Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>

        <Route path="/admin" element={<Admin />} />

        <Route
  path="/watch"
  element={
    <ProtectedRoute>
      <Watch />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>

  );
}

export default App;