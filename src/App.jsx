import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Auth/Login/Login.jsx";
import Register from "./Auth/Register/Register.jsx";
import CheckEmail from "./Auth/Related/CheckEmail.jsx";
import EmailConfirmation from "./Auth/Related/EmailConfirmation.jsx";
import ForgetPassword from "./Auth/Related/ForgetPassword.jsx";
import ResetPassword from "./Auth/Related/ResetPassword.jsx";
import Error from "./Pages/Error.jsx";
import Home from "./Pages/Home.jsx";
import UpdatePassword from "./Pages/UpdatePassword.jsx";
import PrivateRoutes from "./Utils/PrivateRoutes.jsx";
import io from "socket.io-client";

export const token = `${import.meta.env.VITE_BEARER_KEY}${localStorage.getItem(
  "token"
)}`;

export const clientIo = io(`${import.meta.env.VITE_BASE_URL}`);

function App() {
  clientIo.emit("updatedSocketId", { token });

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={1500} />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirmation" element={<EmailConfirmation />} />
        <Route path="/checkEmail" element={<CheckEmail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
