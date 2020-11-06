# Frameworkless Demonstartion

A web application demostrating what can be achieved in a short time without use of frameworks

## Usage

* Clone: `git clone git@github.com:IronRex/frameworkless-1.git`
* Build: `npm install`
* Run: `npm start`

## What this demonstrates

This application demostrates implementation of the following concepts without the use of any frameworks

* Server side rendering (initial page load)
* Client side rendering (adding and removing quotes)
* Bundling client side HTML, JS and CSS (view page source)
* Using the same code to render client and server HTML (adding quote)
* Accessing a persistent database (adding and removing quotes)
* Accessing external service (getting a random quote)
* Persistent running application state (refresh page after adding or removing quotes)
* Persistent server state (restart server and refresh page)

## Acknowledgement

This demo is using free public quote API from <https://favqs.com/>. Please be careful when using it. It would be a shame if they had to require logins or CAPTCHAs to prevent abuse.
