First of all, make sure you have the following installed on your computer:

- Visual Studio Code
- Node
- PostgreSQL

SETUP YOUR DATABASE
###################

Go to the .env file, change the following to your own PostgreSQL credentials:

- DATABASE_PASSWORD=
- TYPEORM_PASSWORD=

The DATABASE_USERNAME & TYPEORM_USERNAME should be the "postgres" which is the default for postgres, but if you changed it while installing PostgreSQL then change the value. Same for other settings except if you changed them from the default while installing.

Open your pgAdmin that comes with PostgreSQL, & create a database named "videoconference". If you prefer another name, don't forget to change the name in the .env file

INSTALL DEPENDENCIES
####################

On VS Code, go to the terminal window either by pressing Ctrl+` or going to the Menu -> View -> terminal, type the following:
    
    npm install

Make sure you have an internet connection.

RUN THE PROJECT
###############

Run the project by typing on the terminal: 

    npm start

Open another terminal window & start the Peer Server by typing:
    
    peerjs --port 3001

Open any web browser on your computer & type:
    
    http://localhost:3300

