# noc_notifications

Termux, Node.js client for notifications server in our NOC

I wanted to replace (or provide backup for) SMS notifications for our NOC2 personel
when on duty. That could be done in more than a few ways and this is my try (I'm not a programmer
and this is my first GitHub upload ever).

Noc_notifications client connects to our server and pops-up a Termux notification when needed.

Also there is a voice notification from termux-tts.

## Prerequisites

Android phone capable of running Termux

Termux app and Termux-api add-on

Node.js

Access to our notifications server (use VPN if needed)

## Installing

Install Termux and Termux-api (no root required)

Open Termux session and run following commands:

```
    termux-wake-lock
    pkg install nodejs
    pkg install termux-api
    npm install --save universal-reconnecting-websocket
    git clone https://github.com/silvije2/noc_notifications
```

## Running

To run a noc_notifications client type following command:

```
    cd noc_notifications
    node noc_notifications.js
```

and keep it running...

## Authors

* **Silvije2** [Github](https://github.com/silvije2/)

### Remarks

Comments and variable names are in Croatian!

## License

GPL-3.0-or-later

## Acknowledgments

* Filip H.

