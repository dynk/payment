# payment
This is the backend for payments solution based on node 8.x.x

# Set up and run
Docker version 17.06


# Set up and run MongoDb on docker 
Run the following in your terminal:
docker-compose up --build

# Guide through the application
To create a regular user use the route:

    - POST localhost:3020/v1/users
    - Payload: 
    {
	    "email": "",
	    "name": "",
	    "password": "",
    }

To create a admin user provide the adminCode field with 'secretadmincode123' code.

To login:

    - POST localhost:3020/v1/users/login
    - Payload: 
    {
	    "email": "",
	    "password": "",
    }

then you will receive a token on the header (x-auth), use it to access your data.


