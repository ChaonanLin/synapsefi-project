This Project is a simple bank account user interface built on top of [Synapsefi API](https://docs.synapsefi.com/) in its Sandbox environment. Synapse APIs help companies build and launch best-in-class financial products on top of our banking infrastructure.

This demo project has the basic functions of <br> 1. rendering transaction history <br> 2.transfer money between bank accounts/cards of the same user <br>
And the rest part of the UI are static UI.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run

In the project directory, you can run: `npm start` to run the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Snapsefi API Used

Create User, OAuth User, View User, Open Deposit Account, Issue a Card Number, Activate Card, ACH Transactions, Link with Bank Logins, View All User Nodes, View Node Transactions, View Account

## Dependencies Used

[Axios](https://github.com/axios/axios)<br>
[Material-UI](https://material-ui.com/)<br>
[React-redux](https://react-redux.js.org/)<br>
[Redux](https://redux.js.org/)<br>
[Redux-thunk](https://github.com/reduxjs/redux-thunk)<br>
[React-currency-input](https://www.npmjs.com/package/react-currency-input)

## Other
- CORS Proxy is used in this project too to bypass CORS blocks: [cors-anywhere](https://github.com/Rob--W/cors-anywhere)
- Would be nice to add:
    - Responsiveness
    - Form validation
    - Test unit
    - Better error handling feedbacks
    - More complete functionalities
    - ...
