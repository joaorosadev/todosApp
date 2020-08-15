'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Blipp = require('blipp');
const HttpTrafic = require('hapi-plugin-traffic');
const SanitizePayload = require('hapi-sanitize-payload');
const {Logs}  = require('./logging/util');
const {Routes} = require('./routing/routes');

/**
 ****************************************** Server bootstrap *********************************************************************
 */
const init = async () => {

    const server = Hapi.server({
        port: 8000,
        host: 'localhost',
    });

    /**
     * ***************************************************** PLUGINS *************************************************************
     */
    await server.register(Inert);           //Used inside /routing/routes.js to serve angular build version folder
    await server.register(Blipp);           //On start, logs routes into console
    await server.register(HttpTrafic);      //Console logging for requests
    await server.register(SanitizePayload); //Requests payload sanitizer

    //Routes init
    Routes(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);

    //Deals with file and console logging
    Logs(server);

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();


