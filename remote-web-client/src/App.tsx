import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from 'react-router-dom';
import Profile from "./Components/Profile";
import BasicControlsPage from "./Components/BasicControlsPage";
import useAccessToken from "./Auth/useAccessToken";
import { acceptConnection, getConnection } from "./connection";
import { Connection } from "./types";
import ConnectedToDesktop from "./Components/ConnectedToDesktop";

function App() {
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();
  const accessToken = useAccessToken();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const connectionId = searchParams.get('id') || '';
  const [ connection, setConnection ] = useState<Connection | null>(null);

  useEffect(() => {
    if(isLoading || !isAuthenticated || !user) return;

    acceptConnection(connectionId, user, accessToken)
      .then(() => getConnection(connectionId, accessToken))
      .then((c) => setConnection(c))
      .catch((e) => {
        console.error(e);
        
        navigate('/connection-acceptance-error');
      });

  }, [
    connectionId,
    acceptConnection,
    getConnection,
    accessToken,
    isAuthenticated,
    isLoading,
    user,
    navigate
  ]);

  if (isLoading || !connection) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    loginWithRedirect();
    return <div>Redirecting...</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-900 p-4 bg-gray-900 text-white flex flex-col justify-center items-center min-h-screen">
      <div className="absolute top-4 right-4">
          <Profile />
      </div>
      <ConnectedToDesktop connection={connection} />
      <BasicControlsPage connectionId={connectionId}/>
      <footer className="text-gray-400 mt-8 text-sm">
          Розроблено Гузюком Михайлом
      </footer>
    </div>
  );
}

export default App;
