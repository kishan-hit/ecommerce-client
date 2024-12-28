import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const { login } = useSession();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get("user");

        if (userParam) {
            const user = JSON.parse(decodeURIComponent(userParam));
            console.log("Authenticated user:", user);

            // Store user in session or state
            login(user);
            navigate("/");
        }
    }, [login, navigate]);

    return <div>Authenticating...</div>;
};

export default GoogleCallback;
