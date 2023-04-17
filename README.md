![articleapp](https://user-images.githubusercontent.com/112657574/232605695-1d4d99af-2767-40af-9fcd-a98687c50844.gif)

## Tools

- Node 16.x
- NPM 8.x (update NPM executing `npm i -g npm`)
- Unix-like shell (Gitbash/bash/zsh)
- Chrome >= 100.x

❗ Other configurations might work but haven't been tested.

## Project Setup

- Fork, clone, and `npm install`. You won't need to add any extra libraries.
- Launch the project in a development server executing `npm run dev`.
- Visit your app by navigating Chrome to `http://localhost:3000`.
- Run tests locally executing `npm test`.
- Local test modules are `codegrade_mvp.test.js` and `Spinner.test.js`.

## Studying the API

The endpoints needed for this project are the following:

- `[POST] http://localhost:9000/api/login`
  - Expects a payload with the following properties: `username`, `password`
  - Example of payload: `{ "username": "foo", "password": "12345678" }`
  - The `username` length must be >= 3, and the `password` >= 8, after trimming
  - The response to a proper request includes `200 OK` and the auth token
- `[GET] http://localhost:9000/api/articles`
  - Expects an `Authorization` request header containing a valid auth token
  - The response to a proper request includes `200 OK` and a list of articles which could be empty
- `[POST] http://localhost:9000/api/articles`
  - Expects an `Authorization` request header containing a valid auth token
  - Expects a payload with the following properties: `title`, `text`, `topic`
  - The `title` and `text` length must be >= 1, after trimming
  - The `topic` needs to be one of three values: `React`, `JavaScript`, `Node`
  - Example of payload: `{ "title": "foo", "text": "bar", "topic": "React" }`
  - The response to a proper request includes `201 Created`, a success message and the new article
- `[PUT] http://localhost:9000/api/articles/:article_id`
  - Expects an `Authorization` request header containing a valid auth token
  - Expects a payload with the following properties: `title`, `text`, `topic`
  - The `title` and `text` length must be >= 1, after trimming
  - The `topic` needs to be one of three values: `React`, `JavaScript`, `Node`
  - Example of payload: `{ "title": "foo", "text": "bar", "topic": "React" }`
  - The response to a proper request includes `200 OK`, a success message and the updated article
- `[DELETE] http://localhost:9000/api/articles/:article_id`
  - Expects an `Authorization` request header containing a valid auth token
  - The response to a proper request includes `200 OK` and a success message
