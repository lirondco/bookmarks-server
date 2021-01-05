# Bookmarks Server

This is a Thinkful assignment where we recreate the bookmark's app's server.

## Set up

How to test this server:

1. Clone this repository to your local machine `git clone URL`
2. `cd` into the cloned repository
3. Install the node dependencies `npm install`
4. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
5. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`
6. Add an `API_TOKEN: ${insert your token here}` in the .env file

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Requirements

    <ul>
    <li>Use the boilerplate to start a new application named bookmarks-server
    </li><li>Configure logging and API key handling middleware on the server
    </li><li>Write a route handler for the endpoint GET /bookmarks that returns a list of bookmarks
    </li><li>Write a route handler for the endpoint GET /bookmarks/:id that returns a single bookmark with the given ID, return 404 Not Found if the ID is not valid
    </li><li>Write a route handler for POST /bookmarks that accepts a JSON object representing a bookmark and adds it to the list of bookmarks after validation.
    </li><li>Write a route handler for the endpoint DELETE /bookmarks/:id that deletes the bookmark with the given ID.
    </li></ul>