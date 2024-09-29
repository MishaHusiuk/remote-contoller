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

    - build electron app for 2 platforms: MacOS and Windows
    - test electron app on Windows
    - host application in the cloud
    - upload electron app to s3 and make a web page for downloading it
    - record number of downloads
    - Translations
- Misc
    - Show disconnect button when connection is established instead of Connect - done
    - UI display what is the name of currently connected computer
    - When electron app gets closed, client app should be notified of connection closed
    - Web app: show currently logged-in user, and log-out button
Bugs
- Connect window can be opened multiple times - done
- Close connection window when connection is established - done

- Desktop app: login -> log out -> log in -> new app icon in the tray is added
- With authentication app stopped responding in local network
- Connect window should be opened near tray
- There should be no maximize button on connect window
- When non-google user's token is validated, the following error occurs: 
- UI: buttons height and width

```
InvalidTokenError: Invalid Compact JWS
    at /Users/mishahuziuk/projects/remote-contoller/api/node_modules/express-oauth2-jwt-bearer/dist/index.js:300:19
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async /Users/mishahuziuk/projects/remote-contoller/api/node_modules/express-oauth2-jwt-bearer/dist/index.js:403:24
```

TechDept:
- Convert electron app to typescript and ES modules
- Support .env in api
- Support .env in electron app
- Store connections in database/redis cache
- Reorganise folders in electron app for managing screens

High-risk areas:
- Test app on windows
- Publishing desktop app
- Deployment: make sure auth0 integration work fine
- Deployement: make sure websockets work fine
- Changing the design of WEB app
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