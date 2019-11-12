//https://github.com/silvije2/noc_notifications

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const URWS = require('universal-reconnecting-websocket');
const opts = {
    deserializer:null,
}
const ws = new URWS('wss://risha.carnet.hr:444/alerti',opts);
var prekid = 0;
ws.on('connect', () => {
    var vrijeme = timestamp();
    console.log(vrijeme + 'Connected!');
});
//ws.on('error', console.error) // handle / display errors
//ws.on('info', console.debug) // handle non-error status events
ws.on('reconnect', () => {
    var vrijeme = timestamp();
    console.log(vrijeme + 'Reconnected!');
    prekid = 0;
});
ws.on('state', (ss) => {
    if (ss.match(/disconnected/)) {
    if (!prekid) {
        var vrijeme = timestamp();
        var cmd;
        console.log(vrijeme + 'Disconnected!');
        prekid = 1;

        const { exec } = require('child_process');
        cmd = "echo " + vrijeme + "Disconnected! | termux-notification --group NOC -t NOC";
        exec(cmd, (err, stdout, stderr) => {
        });

        cmd = "termux-tts-speak -s NOTIFICATION 'disconnected'";
        exec(cmd, (err, stdout, stderr) => {
        });
    }
    }
});
ws.on('message', function message(ev) {
    var vrijeme = timestamp();
    var nmsg;
    var say;
    var cmd;
    if (ev.includes('DDOS')){
	nmsg = "DDOS napad";
	say = "denial of service";
    }
    else if (ev.includes('Portscan')){
	nmsg = "Portscan napad";
	say = ""; //this is too frequent so do not say anything :-)
    }
    else if (ev.includes('Zenoss')){
	var clean = ev.replace(/<\/?[^>]+(>|$)/g, "");
	nmsg = clean.split(/-(.+)/)[1] + "Zenos critical ";
	say = "Zenoss critical";
    }
    else {
	nmsg = "Unknown";
	say = "";
        console.log(vrijeme + ev);
    }
    const { exec } = require('child_process');
    cmd = "echo " + vrijeme + nmsg + " | termux-notification --group NOC -t NOC";
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
	//console.error(err)
        } else {
	//console.log(`stdout: ${stdout}`);
	//console.log(`stderr: ${stderr}`);
        }
    });

    if (say != "") {
	cmd = "termux-tts-speak -s NOTIFICATION '" + say + "'";
	exec(cmd, (err, stdout, stderr) => {
	    if (err) {
	    //console.error(err)
	    } else {
	    //console.log(`stdout: ${stdout}`);
	    //console.log(`stderr: ${stderr}`);
	    }
	});
    }
});

ws.start();

function addZero(i) {
    if (i < 10) {
    i = "0" + i;
    }
    return i;
}

function timestamp() {
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    var dan = addZero(d.getDate());
    var mje = addZero(d.getMonth()+1);
    var god = addZero(d.getFullYear());
    var tstamp = dan + "-" + mje + "-" + god + " " + h + ":" + m + ":" + s + " ";
    return tstamp;
}
