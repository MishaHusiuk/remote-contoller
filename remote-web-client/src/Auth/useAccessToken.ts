import { useEffect, useState } from "react";
import config from '../env-config';
import { useAuth0 } from "@auth0/auth0-react";

function useAccessToken() {
    const { getAccessTokenSilently } = useAuth0();
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
    }, [getAccessTokenSilently]);

    return accessToken;
};

export default useAccessToken;