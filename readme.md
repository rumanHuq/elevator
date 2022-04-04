# Version used
node: v16.14.0
npm: v8.3.1

# How to start
```sh
$ npm i # Project root
$ npm start # this will start both ./frontend and ./backend
```

# e2e
```sh
# there is a bare minimum cypress test available, run it by
$ npm run e2e # make sure `npm start` is ran in a seperate terminal
```

> ❕ npm workspace is used, which enables monorepo setup.

> ❕ `/stream` endpoint causes error as `res.flush` is obsolete. refactor done in `backend/src/index.js:34`
