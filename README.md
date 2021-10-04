#Accounting System

A sample single user accounting system api

**Author:** Adeyinka Micheal

**Environments**

Node version - v14.10.0

**This application uses the following technologies:**

- nodeJs
- restify
- mocha
- chai

note: `run all commands in the applications root directory`

## To run the app via docker

```
docker-compose up
```

## To run the app manually

**Install all dependencies**

```
npm install
```

**Start the application**s

```
source .env

npm start
```

## To test the application

```
npm test
```

## Get account balance

**Endpoint** `/account_balance/b4563-134-7632-6a366-12b3` - method (GET)

- Fetches the account balance


**Response format**

```json
{
    "error": false,
    "code": 200,
    "data": {
        "accountBalance": 1500
    },
    "message": "successful operation"
}
```

### Get a account details by id

**Endpoint** `/account_details/b4563-134-7632-6a366-12b3` - method (GET)

- Fetches a user account details

**Response format**

```json
{
    "error": false,
    "code": 200,
    "data": {
        "id": "b4563-134-7632-6a366-12b3",
        "balance": 1500,
        "accountType": "savings",
        "accountOpeningDate": "2021-10-04T19:21:58.222Z"
    },
    "message": "successful operation"
}
```

### application/json

### Get transaction History

**Endpoint** `/transaction_history/b4563-134-7632-6a366-12b3` - method (GET)

- retrieves the transaction history for an account

**Response format**

```json
{
    "error": false,
    "code": 200,
    "data": {
        "transactionHistory": [
            {
                "id": "b4563-134-7632-6a366-12b3",
                "balance": 1500,
                "accountType": "savings",
                "accountOpeningDate": "2021-10-04T19:21:58.222Z"
            }
        ]
    },
    "message": "successful operation"
}
```

### application/json
**Endpoint** `/commit_transaction/b4563-134-7632-6a366-12b3` - method (POST)

**Payload**

```json
{
    "amount": 100,
    "accountType": "debit"
}
```

**Response format**

```json
{
    "error": false,
    "code": 200,
    "data": {
        "id": "b4563-134-7632-6a366-12b3",
        "balance": 1400,
        "accountType": "savings",
        "accountOpeningDate": "2021-10-04T19:21:58.222Z",
        "effectiveDateTime": "2021-10-04T19:26:22.619Z"
    },
    "message": "successful operation"
}
```

### application/json

This is the link to the postman collection
```
https://www.getpostman.com/collections/52a770b334e61b4e7eb5
```

This is the link to the app
```
https://accounting-check.herokuapp.com/
```