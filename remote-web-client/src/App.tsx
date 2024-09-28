import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Components/Login";
import LogoutButton from "./Components/Logout";
import Profile from "./Components/Profile";
import BasicControls from "./Components/BasicControls";

function App() {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;  // Display a loading indicator while checking the authentication status
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <LoginButton />
        <LogoutButton />
        <Profile />
      </div>
      <BasicControls />
    </>
  );
}

export default App;
