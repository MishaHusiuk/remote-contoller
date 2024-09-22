# Remote controller

## Build

`docker build --platform linux/amd64 -t test-build .`


## Project management
Tracks:
- User authentication
    - Adding QR code to the electron app
    - Adding login forms both electron app, and client app
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
