import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from 'react-router-dom';
import BasicControlsPage from "./Components/BasicControlsPage";
import useAccessToken from "./Auth/useAccessToken";
import { acceptConnection, getConnection } from "./connection";
import { Connection } from "./types";
import ConnectedToDesktop from "./Components/ConnectedToDesktop";
import Loading from "./Components/Loading";

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
        
        navigate('/invalid-connection');
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
    return <Loading />;
  }

  if (!isAuthenticated || !user) {
    loginWithRedirect();
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <ConnectedToDesktop connection={connection} />
      <BasicControlsPage connectionId={connectionId}/>
    </>
  );
}

export default App;
