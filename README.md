### How to run

- configure .env.local based on .env.example
- start stripe listener (stripe listen --forward-to localhost:3000/api/webhooks)
- start the app(on port 3000, otherwise things will not work correctly)

### Features

- [x] User can login with github
- [x] User can read a little part of the post if there's no subscription or session
- [x] User can subscribe to read all the posts completely
