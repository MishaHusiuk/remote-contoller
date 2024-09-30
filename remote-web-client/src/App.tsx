import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from 'react-router-dom';
import LoginButton from "./Components/Login";
import LogoutButton from "./Components/Logout";
import Profile from "./Components/Profile";
import BasicControlsPage from "./Components/BasicControlsPage";
import useAccessToken from "./Auth/useAccessToken";
import { acceptConnection } from "./connection";
import { useEffect } from "react";

function App() {
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();
  const accessToken = useAccessToken();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const connectionId = searchParams.get('id') || '';

  useEffect(() => {
    if(isLoading || !isAuthenticated || !user) return;

    acceptConnection(connectionId, user, accessToken).catch((e) => {
      console.error(e);
      
      navigate('/connection-acceptance-error');
    });

  }, [connectionId, acceptConnection, accessToken, isAuthenticated, isLoading, user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;  // Display a loading indicator while checking the authentication status
  }

  if (!isAuthenticated || !user) {
    loginWithRedirect();
    return <div>Redirecting...</div>;
  }

  return (
    <div className="bg-gray-900 text-white flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-row justify-between">
        <LoginButton />
        <LogoutButton />
        <Profile />
      </div>
      <h1 className="text-2xl font-bold mb-6">Керування ПК</h1>
      <BasicControlsPage connectionId={connectionId}/>
      <footer className="text-gray-400 mt-8 text-sm">
          Розроблено Гузюком Михайлом
      </footer>
    </div>
  );
}

export default App;
