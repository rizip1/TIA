### How to run?
#### Production version
Production version runs on https://hiker-tia.herokuapp.com/.

*Note*: It might take time to first load the app because of heroku free account.

There are two users already created so you can easily log in:

email: jozko@gmail.com <br>
password: tajneheslo

email: richardizip@gmail.com <br>
password: tajnejsieheslo

[Mailgun](https://www.mailgun.com/) handles email sending in live version. Custom gmail accounts would be blocked (heroku servers are in US so gmail will respond with suspision to hijacked credentials). However there is sandbox domain used for sending emails so
every account has to be verfied to receive emails.

#### Development version
Install all packages
```
npm install
```

Copy and set environment settings
```
cp .env-template .env
```
*Note*: Need to set up login and password for gmail account from which registration emails will be sent.


Start development server
```
npm run dev
```

*Note*: Need to have postgres database created according to ```/src/backend/knex``` settings. This might
be time consuming business so instead use production version for try. In the future the dump of the database will be uploaded here.

### Used technologies and approaches
* [Express](https://expressjs.com/) and [knex](http://knexjs.org/) for backend (in ```/src/backend``` folder)
* Frontend app ([react](https://facebook.github.io/react/), [redux](http://redux.js.org/), [react-router](https://reacttraining.com/react-router/web/guides/quick-start), [redux-form](http://redux-form.com/6.6.3/), more react-like packages)
* [Webpack](https://webpack.github.io/), [babel](https://babeljs.io/), [npm](https://www.npmjs.com/) scripts for setup

### Implemented from beta version plan
* Registration (with confirmation email)
* Login
* Logout
* Creating and deleting interests
* Assigning and unassigning from interests

### Not implemented from beta version plan
Currently when user assignes or unassignes from interest other users do not receive any notification but notification is
only shown to current user. Notifications requires new db table which was not part of the documentation and might be 
added in final version.

### Father improvements (major)
* Add comments to interests
* Create profile section
* Automatic invitations for interests
* ? Notification system

### Father improvements (minor)
* Store session in db
* CSRF protection
* Highligh current menu bar
