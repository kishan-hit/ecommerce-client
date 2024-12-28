import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import HomePage from "./pages/HomePage";
import Setup2FA from "./pages/Setup2FA";
import Verify2FA from "./pages/Verify2FA";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/user/UserProfile";
import GoogleCallback from "./components/GoogleCallback";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        path: "/register",
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        path: "/auth/google/callback",
        element: <GoogleCallback />,
        errorElement: <Error />,
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                errorElement: <Error />
            },
            {
                path: "/setup-2fa",
                element: <Setup2FA />,
                errorElement: <Error />
            },
            {
                path: "/verify-2fa",
                element: <Verify2FA />,
                errorElement: <Error />
            },
            {
                path: "/user/profile",
                element: <UserProfile />,
                errorElement: <Error />
            }
        ]
    }
]);

export default router;