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
	    "email": string,
	    "name": string,
	    "password": string,
    }

To create a admin user provide the adminCode field with 'secretadmincode123' code.

To login:

    - POST localhost:3020/v1/users/login
    - Payload: 
    {
	    "email": string,
	    "password": string,
    }

then you will receive a token on the header (x-auth), use it to access your data.

To create your wallet:

    - POST localhost:3020/v1/users/{{userId}}/wallets

To add cards to your wallet:

    - POST localhost:3020/v1/users/{{userId}}/wallets/{{walletId}}/cards
    - Payload: 
    {
	    "number": string,(will be encrypted)
	    "holder": string,
	    "cvv": string,string,(will be encrypted)
	    "expirationDate": date,(ex: 2018-01-01)
	    "limit": number,
	    "payDay": number(ex: 15)
    }

To get wallets:

    - get localhost:3020/v1/users/{{userId}}/wallets

To get cards:

    - get localhost:3020/v1/users/{{userId}}/wallets/{{walletId}}



To buy :

    - POST localhost:3020/v1/users/{{user}}/wallets/{{wallet}}/buy
    - Payload: 
        {
	    "amount": number
        }

To pay:

    - POST localhost:3020/v1/users/{{user}}/wallets/{{wallet}}/pay
    - Payload: 
        {
	    "amount": number
        }


# Admin private routes

To get ALL wallets:
    - GET localhost:3020/v1/wallets/

To delete a wallet:
    - DELETE localhost:3020/v1/wallets/{{walletId}}


