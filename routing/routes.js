"use strict;"

const Joi = require('@hapi/joi');

//Used in cors options to allow cross site requests from this host
const ALLOWED_ORIGIN = ["http://localhost:4200"];

//Some initial server data (hard coded array to simplify portability of the project)
//There's a mysql_db_example.js file in the mysql_example folder which shows examples that could easily be implemented into
//the project, using a mysql database
const tasks = [
    { id: 1, description: 'Running', done: false },
    { id: 2, description: 'Coding', done: true },
    { id: 3, description: 'Reading', done: false}
];

//To mimic database insertion with incremental task.id as primary key
var incrementalId = tasks.length + 1;

exports.Routes = (server) => {
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './client/dist/client',
                index: ['index.html', 'default.html']
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/tasks',
        options: {
            cors: {
                origin: ALLOWED_ORIGIN
            }
        },
        handler: (request, h) => {
            return tasks;
        }
    });

    server.route({
        method: 'DELETE',
        path: '/tasks/{id}',
        options: {
            cors: {
                origin: ALLOWED_ORIGIN
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                })
            }
        },
        handler: (request, h) => {
            let id = request.params.id;
            let taskToDelete = {};

            tasks.forEach((task) => {
                if (task.id == id) {
                    taskToDelete = task;
                    tasks.splice(tasks.indexOf(task), 1);
                }
            });
            request.log('Delete Request', 'A DELETE request has been made.');
            return taskToDelete;
        }
    });

    server.route({
        method: 'POST',
        path: '/tasks',
        options: {
            cors: {
                origin: ALLOWED_ORIGIN
            },
            validate: {
                payload: Joi.object({
                    id: Joi.number(),
                    description: Joi.string().min(1).max(40).required(),
                    done: Joi.boolean().required()
                })
            }
        },
        handler: (request, h) => {
            request.payload.id = incrementalId++;
            tasks.push(request.payload);
            request.log('Post Request', 'A POST request has been made.');
            return request.payload;
        }
    });

    server.route({
        method: 'PUT',
        path: '/tasks/{id}',
        options: {
            cors: {
                origin: ALLOWED_ORIGIN
            }
        },
        handler: (request, h) => {
            let id = request.params.id;
            let taskWithGivenId = {};

            tasks.forEach((task) => {
                if (task.id == id) {
                    taskWithGivenId = task;
                    task.done = !task.done;
                }
            });
            return taskWithGivenId;
        }
    });
    
}

