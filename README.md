## Getting Started

These instructions will explain how to run the project on your local machine.


### Installing

Install the contents of the package.json

```
npm install
```

or

```
yarn add
```


## Running already build project

To start and use already build frontend part 

Run this command:

```
npm start
```
or

```
yarn start
```

After that you can enjoy the project locally:
http://localhost:3001

## Running client side separately

To start and use the client side - frontend project 

1. Install the content in the client folder

    ```
    cd client && npm install
    ```
    or
    
    ```
    cd client && yarn start
    ```

2. Make sure the tracker in the `client/src/api/tracker.js` file is pointing to your local host

3. Run this command (still inside client folder):
   
    ```
    npm start
    ```
    or
    
    ```
    yarn start
    ```

After that you can enjoy the project locally:
http://localhost:3000

## Tests

1. To run all tests:

    ```
    npm test
    ```
    or
    
    ```
    yarn test
    ```

2. The same for the frontend in the client folder
    ```
    cd client && npm test
    ```
    or
    
    ```
    cd client && yarn test
    ```
