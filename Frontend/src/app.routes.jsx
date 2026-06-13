import {createBrowserRouter} from "react-router";
import LoginPage from "./features/auth/pages/Login";
import RegisterPage from "./features/auth/pages/Register";
import Home from './features/interview/pages/Home'
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
    element: <Protected><Home /></Protected>
  }
])