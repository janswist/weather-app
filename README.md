# Weather-Vue test app

The purpose of this small app is to show my coding style and (small portion of my) skills in regard to:
- coding style
- structure
- naming
- networking
- testing
- dependency injection

Notes:
- I'm using TWO http clients for dependency injection example purposes. You can choose between `axios` and `fetch` or add new one without changing the implementation.
- WeatherApi key is exposed on purpose to make it easier to just download and run.
- Less is more. Only pros know that it's easier to write long code than a short one, but not too short. Readability is also key.


# Running the app

## Project setup
Installs all the dependecies
```
npm install
```

Compiles and hot-reloads for development
```
npm run dev
```

Compiles and minifies for production
```
npm run build
```

## Testing
### Unit tests
```
npm run test
```

### E2E testing
Requires localhost server already running. 
- `npm run dev` before starting e2e tests
to the local development server (if not already started)
- `npm run cypress:open`
- after Cypress dialog opens click `Start E2E Testing in Chrome`
- select `Weather.cy.js` to start tests

To close:
- on the initial Cypress dialog click `Close`