import {createBrowserRouter} from "react-router";
import LoginPage from "./features/auth/pages/Login";
import RegisterPage from "./features/auth/pages/Register";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <main><h1>Home</h1></main>
  }
])