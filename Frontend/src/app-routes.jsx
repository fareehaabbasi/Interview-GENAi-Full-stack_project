import { createBrowserRoute } from "react-router";
import Register from "./feature/auth/pages/Register";
import Login from "./feature/auth/pages/Login";

export const router = createBrowserRoute([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    }
])