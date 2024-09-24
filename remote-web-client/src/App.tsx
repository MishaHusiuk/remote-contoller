import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Components/Login";
import LogoutButton from "./Components/Logout";
import Profile from "./Components/Profile";
import { Command } from "./types";
import config from './env-config';
import { useEffect, useState } from "react";

function App() {
  const { isAuthenticated, loginWithRedirect, logout, isLoading, getAccessTokenSilently } = useAuth0();
  
  const [ accessToken, setAccessToken ] = useState('');
  useEffect(() => {
    getAccessTokenSilently({
      authorizationParams: {
        audience: config.AUTH0_AUDIENCE,//`https://${config.AUTH0_DOMAIN}/api/v2/`,
        scope: config.AUTH0_SCOPE,
      },
    }).then((accessToken) => {
      setAccessToken(accessToken);
    });
  }, [getAccessTokenSilently])

  if (isLoading) {
    return <div>Loading...</div>;  // Display a loading indicator while checking the authentication status
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return <div>Redirecting...</div>;
  }
  
  const handleClick = async (command: Command) => {
    fetch('/api/command', { 
      method: 'POST', 
      body: JSON.stringify({
        commandName: command
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <LoginButton />
        <LogoutButton />
        <Profile />
      </div>
      <div className="h-dvh">
        <div className="p-8 bg-gray-600 flex flex-col justify-between h-full">
          <div className="grid grid-cols-3 grid-rows-3 gap-4">
            <div className="p-4 bg-teal-500 rounded-md flex items-center justify-center row-start-1 col-start-1">
              <button onClick={() => handleClick(Command.ESC)}>esc</button>
            </div>
            <div className="p-4 bg-teal-500 rounded-md flex items-center justify-center row-start-1 col-start-2 col-span-2">
              <button onClick={() => handleClick(Command.ENTER)}>Enter</button>
            </div>
            <div className="p-4 bg-teal-500 rounded-md flex items-center justify-center row-start-2 col-start-1">
              <button onClick={() => handleClick(Command.TAB)}>TAB</button>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-4 gap-4">
            <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-1 col-start-2">
              <button onClick={() => handleClick(Command.UP)}>↑</button>
            </div>
            <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-2 col-start-1">
              <button onClick={() => handleClick(Command.LEFT)}>←</button>
            </div>
            <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-2 col-start-3">
              <button onClick={() => handleClick(Command.RIGHT)}>→</button>
            </div>
            <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-2 col-start-2">
              <button onClick={() => handleClick(Command.DOWN)}>↓</button>
            </div>
            <div className="p-4 bg-teal-500 rounded-md flex items-center justify-center row-start-4 col-start-1 col-span-3">
              <button onClick={() => handleClick(Command.SPACE)}>space</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
