# Remote controller

## Build

`docker build --platform linux/amd64 -t test-build .`


## Project management
Tracks:
- User authentication / Connect to a device
    - Adding QR code to the electron app - done
    - Adding login forms both electron app, and client app - done
    - Adding database to manage users' sessions
- Mouse support 
    - UI:
        - drag-n-drop area
        - central conrol is auto-centered
        - cental control clicks
            - double clicked for left click
            - long clicked for right click
    - logic
        - manage directions?
        - throttle/debounce/start-stop events
- Production-ready
    - buy domain
    - build electron app for 2 platforms: MacOS and Windows
    - test electron app on Windows
    - host application in the cloud
    - upload electron app to s3 and make a web page for downloading it
    - record number of downloads
    - Translations

Bugs
- Desktop app: login -> log out -> log in -> new app icon in the tray is added
- With authentication app stopped responding in local network
- Connect window should be opened near tray
- Connect window can be opened multiple times
- There should be no maximize button on connect window
