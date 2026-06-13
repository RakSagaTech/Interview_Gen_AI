import {createBrowserRouter} from "react-router";
import LoginPage from "./features/auth/pages/Login";
import RegisterPage from "./features/auth/pages/Register";
import Home from './features/interview/pages/Home'
import Interview from './features/interview/pages/Interview'
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
  },
  {
    path: '/interview/:interviewId',
    element: <Protected><Interview /></Protected>
  }
])