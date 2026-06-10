import {createBrowserRouter} from "react-router";
import LoginPage from "./features/auth/pages/Login";
import RegisterPage from "./features/auth/pages/Register";
import Protected from './features/auth/components/Protected'


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
    element: <Protected><h1>Home Page</h1></Protected>
  }
])