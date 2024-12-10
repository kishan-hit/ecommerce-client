import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import HomePage from "./pages/HomePage";
import Setup2FA from "./pages/Setup2FA";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        path: "/",
        element: <HomePage />,
        errorElement: <Error />
    },
    {
        path: "/setup-2fa",
        element: <Setup2FA />,
        errorElement: <Error />
    }
]);