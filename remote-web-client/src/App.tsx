import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from 'react-router-dom';
import BasicControlsPage from "./Components/BasicControlsPage";
import { acceptConnection, getConnection } from "./connection";
import { Connection } from "./types";
import ConnectedToDesktop from "./Components/ConnectedToDesktop";
import Loading from "./Components/Loading";
import config from "./env-config";
import useDocumentTitle from "./hooks/useDocumentTitle";

function App() {
  const { isAuthenticated, loginWithRedirect, isLoading, user, getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const connectionId = searchParams.get('id') || '';
  const [ connection, setConnection ] = useState<Connection | null>(null);

  useEffect(() => {
    if(isLoading || !isAuthenticated || !user) return;

    let accessToken: string = '';
    getAccessTokenSilently({
      authorizationParams: {
        audience: config.AUTH0_AUDIENCE,
        scope: config.AUTH0_SCOPE,
      },
    })
      .then((_accessToken: string) => accessToken = _accessToken)
      .then(() => acceptConnection(connectionId, user, accessToken))
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
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    user,
    navigate
  ]);

  useDocumentTitle(connection?.controlledDesktopName);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated || !user) {
    const originalUrl = window.location.href; // Current URL
    const url = new URL(originalUrl);
    const currentRelativePath = url.pathname + url.search;    
    loginWithRedirect({
        appState: { returnTo: currentRelativePath } // Pass the original URL as state
    });

    return <div>Redirecting...</div>;
  }

  if(!connection) {
    return <Loading />;
  }

  return (
    <>
      <ConnectedToDesktop connection={connection} />
      <BasicControlsPage connectionId={connectionId}/>
    </>
  );
}

export default App;
