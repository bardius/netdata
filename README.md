# Netdata test

The test was implemented with create react app typescript template and MUI v4.x as component library.
Focus has been given in the 4 layer architecture of the code and the selection of libraries utilised rather than the UI/UX design due to time constraints.

## Folder Structure Outline

Under source, you can find the source code separated as:

- __mocks__: npm module mocks for jest
- __tests__: unit test specification files (follows the same structure as the codebase)
- components: presentational component with no or minimal logic and state
- contexts: Context API and providers, that expose values to consumer via hooks, utilising the use-context-selector library for performance. All data and requests are orchestrated here including dependency inject of the relevant domain services
- domain: Businesses logic in encapsulated in their respective folders following Clean Architecture principal and can be reused or utilised as vanilla typescript code
  - Axios and SWR abstraction that provides a custom hook
  - Coin domain service that handles any data fetching and transformation
- pages: components that act as routes for react router (have provided a sample for lazy loader route component also)
- theme: MUI theme
- utils: vanilla typescript code that encapsulate reusable generic logic

## Libraries

A curated list of libraries has been added on top of CRA:

- @visx/visx: for charts and data visualization 
- axios: http client
- date-fns: for date handling
- ramda: for utilities
- swr: for data fetching and caching capabilities
- use-context-selector: to optimize the Context API state retrieval as slices
- eslint & prettier: for code formatting and linting

## Potential improvements

Due to time constraints not all aspects of the application have been taken care of. 
Most notable:

- Proper UI/UX for eye sugar
- Accessibility that passes WCAG AA, have added a couple of samples for srOnly data
- Unit tests
- Further, clean up of the chart code
- HTML tile and meta management per page
- Security related issues

If any of these is a requirement, happy to provide it on follow-up commits.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
