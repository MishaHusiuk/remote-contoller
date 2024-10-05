# Remote controller

## Build

`docker build --platform linux/amd64 -t test-build .`

## Project management
Tracks:
- User authentication / Connect to a device - done
    - Adding QR code to the electron app - done
    - Adding login forms both electron app, and client app - done
    - Adding database to manage users' sessions (memory storage) - done
    - Establish websocket connection only by validating the connection id - done
    - Electron app to poll connection status to initiate websocket request after client acceps request - done
- Production-ready
    - buy a domain - done
    - macOS: accessibility safeguard on app startup - done
    - build electron app for MacOS (M1) - done
    - tray translations - done
    - set app icon at built time - done

    - build electron app for MacOS (Intel)
    - build electron app for Windows
    - test electron app on Windows
    - host application in the cloud
    - upload electron app to s3 and make a web page for downloading it
    - record number of downloads
    - Auth0 configurations
        - login page translations
        - warning on the login page
        - custom domain 
- Misc
    - Show disconnect button when connection is established instead of Connect - done
    - UI display what is the name of currently connected computer - done
    - Web app: show currently logged-in user, and log-out button - done
    - When electron app gets closed/disconnected, terminate connection - done
    - Update invalid connection screen - done
    - Generate some basic home page, with short app description, ability to download desktop clients for MacOS, and Windows, and short guide how to start working - done
    - Client app should be notified when connection is terminated - done
    - Loading screen - done
    - Show main icon in the top-left corner of ui app - done
    - Add favicon - done
Bugs
- Connect window can be opened multiple times - done
- Close connection window when connection is established - done
- UI: buttons height and width - done
- When user is not authenticated, and tries to open connection screen, he is not redirected to the connection screen, but to the root screen - done
- Desktop app: login -> log out -> log in -> new app icon in the tray is added - done
- There should be no maximize button on connect window - done
- Connect window should be opened near tray - done
- UI logout process does not work properly - done
- When user clicks logout on desktop app, connection remains active, and app in the tray is still displayed - done
- When non-google user's token is validated, the following error occurs: `InvalidTokenError: Invalid Compact JWS` - done
- When login window is closed app is not closed, but is not accessible - done
- When activating connection, first time connection activated, but sending commands fails but works after page reload 

- With authentication app stopped responding in local network

TechDept:
- Convert electron app to typescript and ES modules
- Support .env in api
- Support .env in electron app
- Store connections in database/redis cache
- Reorganise folders in electron app for managing screens

High-risk areas:
- Changing the design of WEB app - done
- Test app on windows
- Publishing desktop app
- Deployment: make sure auth0 integration work fine
- Deployement: make sure websockets work fine
- Desktop application motonitoring


- Mouse support - deprioritized
    - UI:
        - drag-n-drop area
        - central conrol is auto-centered
        - cental control clicks
            - double clicked for left click
            - long clicked for right click
    - logic
        - manage directions?
        - throttle/debounce/start-stop events