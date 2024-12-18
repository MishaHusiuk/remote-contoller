import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';
import App from './App';
import config from './env-config';
import InvalidConnectionPage from './Components/InvalidConnectionPage';
import HomePage from './Components/HomePage';
import PageWrapper from './Components/PageWrapper';
import AuthCallback from './Auth/AuthCallback';

import './styles/index.css';

const { AUTH0_DOMAIN, AUTH0_CLIENTID, AUTH0_AUDIENCE, AUTH0_SCOPE } = config;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomePage />
    ),
  },
  {
    path: "/connection",
    element: (
        <App />
    ),
  },
  {
    path: '/invalid-connection',
    element: (
      <InvalidConnectionPage />
    )
  },
  {
    path: '/auth-callback',
    element: (
      <AuthCallback />
    )
  }
]);
// degugging purposes only
window.addEventListener("keydown", (event) => alert(event.code));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENTID}
        authorizationParams={{
          redirect_uri: `${window.location.origin}/auth-callback`,
          audience: AUTH0_AUDIENCE,
          scope: AUTH0_SCOPE
        }}
      >
        <PageWrapper>
          <RouterProvider router={router} />
        </PageWrapper>
      </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
