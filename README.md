# noc_notifications

Termux, Node.js client for notifications server in our NOC

I wanted to replace (or provide backup for) SMS notifications for our NOC2 personel
when on duty. That could be done more than few ways and this is my try (I'm not a programmer
and this is my first GitHub upload ever).
Noc_notifications client connects to our server and pops-up a Termux notification when needed.

## Prerequisites

Android phone capable of running Termux
Termux app and Termux-api add-on
Node.js

## Installing

Install Termux and Termux-api (no root required)
Open Termux session and run following commands:

```
    termux-wake-lock
    pkg install nodejs
    npm install --save universal-reconnecting-websocket
```

## Running

To run a noc_notifications client type following command:

```
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

