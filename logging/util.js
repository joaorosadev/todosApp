'use strict;'

const fs = require('fs');

/**
 * Adds request's information to request_logs.txt file
 * @param request Object with request information
 */
function add(request) {
    let typeOfRequest = request._route.method.toUpperCase();
        let path = request._route.path;
        let date = new Date();
        let content = "";

        if(typeOfRequest == 'POST'){
            content = `Method: ${typeOfRequest}\t Path: ${path}\t Payload: ${JSON.stringify(request.payload)}\t Timestamp: ${date.toUTCString()}\n`;
        } else{
            content = `Method: ${typeOfRequest}\t Path: /tasks/${request.params.id}\t Timestamp: ${date.toUTCString()}\n`;
        }
    
        fs.appendFile('./logging/request_logs.txt', content, (err) => {
            if(err) throw err;
        });
}

/**
 * Listens to request and response events and logs them into a file or the console
 * @param server 
 */
exports.Logs = (server) => {
    
    //File logging
    server.events.on('request', (event, tags) => {
        if (tags.error) {
            console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
        } else {
            add(event);
        }
    });

    //Console logging
    server.events.on("response", (request) => {
        let traffic = request.traffic();
        console.log(
            `recv=${traffic.recvPayload}/${traffic.recvRaw} ` +
            `sent=${traffic.sentPayload}/${traffic.sentRaw} ` +
            `start=${new Date(traffic.timeStart)} ` +
            `finish=${new Date(traffic.timeFinish)} ` +
            `duration=${traffic.timeDuration}ms`
        );
    });

}