import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";

const AuthCallback = () => {
    const { handleRedirectCallback } = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const processAuth = async () => {
            try {
                const { appState } = await handleRedirectCallback();
                // Redirect the user to the original URL if it exists in appState
                if (appState?.returnTo) {
                    navigate(appState.returnTo);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error handling Auth0 redirect callback:', error);
                // Optionally, redirect to an error page or handle the error
                navigate('/');
            }
        };

        processAuth();
    }, [handleRedirectCallback, location, navigate]);

    return (
       <Loading />
    );
};

export default AuthCallback;