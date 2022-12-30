# YTS_Clone_Back_End

This is the official repo for the YTS Clone back-end application.

## How to run

Make sure you have Node installed and set up in your system.

After cloning the repository:

1. Create a ".env" file in the project directory, after which:
    - Create a `PORT` variable/key and set an appropriate port for the Express application (for example, 3000).
    - Create a `MONGODB_CONN_STR` variable/key and set the MongoDB connection string (without any url parameters).

2. Open a shell instance in the project directory and run `npm i` (which produces the same effect as of `npm install`).

3. Finally, run the `npm start` command to execute the application.

## API Docs

Please refer to the [docs/routes/README.md](./docs/routes/README.md) for official API documentation.

## Testing

To run unit tests, run the `npm test` command. Unit testing helps test the functionality of each feature individually.
