# Raffle It! Knockout &middot; [![CircleCI](https://circleci.com/gh/raffleit/raffleit-knockout.svg?style=shield)](https://circleci.com/gh/raffleit/raffleit-knockout) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/raffleit/raffleit-knockout/blob/master/LICENSE)

This is an implementation of Raffle It! in Knockout. This was my first implementation of it, and much has changed since. I'm using `requirejs` for modules, and I've even downloaded the libs by hand.

A lot could be done to make the infrastructure of this app up-to-date, but the actual knockout-part of the code stands its time. Check `app.js`.

## Pros and Cons (Purely Subjective)

Pros | Cons
---- | --------
Knockout is dead easy, light and fast | Magic variables in HTML
Easy two-way binding | State-handling, routing and API-calls is not built in.

## Known Bugs
- None

## Command Line Stuff

### Running Locally
* Run `npm install`
* Run `npm start`

### Creating a Production Build
* `npm install`

### Running Tests
Why would you need tests?

## License

Raffle It! is [MIT licensed](./LICENSE).
