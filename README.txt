Running the application:

- Open the terminal in the client folder and run the commands:
    - npm i
    - ng build
- Open the terminal in the todolist folder and run the commands:
    - npm i
    - node server.js

After this we can follow 2 different approaches:

The application can be run in 2 differant ways:

    1. Common way -> The server serves the front end files

        - Open your browser and paste the following url http://localhost:8000

    2. Alternative -> Front-end and Back-end work as different servers. The front-end's server
    makes cross-site requests to communicate with the back-end. The server only allows requests coming from the front-end's home url 
    (http://localhost:4200)
             
        - Open another terminal in the client folder and run the command 'ng serve --open'
        

The Alternative was only made as a learning experiment.