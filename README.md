# Remote controller

## Build

`docker buildx build --platform linux/amd64,linux/arm64 -t mhuziuk/remote-control:version .`
`docker build --platform linux/amd64 -t test-build .`

`docker tag remote-control:0.0.1 mhuziuk/remote-control:0.0.1`
`docker push mhuziuk/remote-control:0.0.1`

``` 
docker run \
-p 443:3000 
--env-file /home/ec2-user/.env
-v /home/ec2-user/cert:/app/api/cert
-d 
mhuziuk/remote-control:0.0.7
```

`npm run make -- --arch=x64 --platform=win32`


## To do's
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
    - deploy application to cloud - done
        - deploy docker container - done
        - setup dns mapping - done
        - update applications to point to deployed application - done
        - test with mobile connection - done
        - support env variables in api, to safely configure certificates - done
        - 
    - update server to generate new connection each time connection is initiated
        - check if there are exiting connections in `initiating` status, update status to `hung` (come up with a better name) - done
    - build electron app for Windows - done
    - test electron app on Windows - done
    - build electron app for MacOS (Intel)
    - upload electron app to s3 and make a web page for downloading it
    - record number of downloads
    - Auth0 configurations
        - login page translations
        - warning on the login page
        - custom domain 
    - Infrastructure automation
        - GitHub Pull-Request action to build docker container and publish it to registry
        - GitHub manual-trigger action to deploy docker container to EC2
        - Cron job to re-generate certificate each N amount of time
        - Add Terraform config to provision infrastructure (EC2 instance)
        - GitHub manual-trigger action to deploy terraform infrastructure
    - Packaging
        - rename app from `desktop-client` into something more meaningful
        - when connection is established for the first time, first command always results with `invalid connection` screen
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
- Support .env in api - done
- Support .env in electron app - does not work
- Store connections in database/redis cache
- Reorganise folders in electron app for managing screens
- Use docker secrets or AWS Secret Manager

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



## LetsEncrypt

`sudo yum update`
`sudo yum install certbot`
`sudo certbot certonly --standalone -d remotectr.com -d www.remotectr.com`

Automatic Certificate Renewal
Let's Encrypt certificates are valid for 90 days, so you'll need to set up automatic renewal using Certbot.

You can use a cron job on the EC2 instance to renew the certificates and restart your container when the certificate is updated:

Edit the cron jobs:

bash
Copy code
sudo crontab -e
Add the following line to attempt renewal every day and restart Docker if needed:

bash
Copy code
0 0 * * * certbot renew --quiet --post-hook "docker restart <container-name>"
This will check daily for certificate renewal and restart your Docker container if the certificate has been renewed.