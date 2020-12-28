# Beeps 🦚

An example of a micro blog app.

See the **[demo]** or create your own instance of the app:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


## Dev

Run the backend:
```
$ composer serve
```

Run the client:
```
$ cd src/client
$ yarn serve
```


Test the API:
```
$ composer test
```


---


## todos

Public:
- [x] read all public "beeps" `GET /beeps`
- [x] authenticate `POST /session`

Authenticated:
- [x] read all "beeps"  `GET /beeps` (same endpoint)
- [ ] add a "beep" `POST /beeps`
- ??? remove/update owned "beep" `DELETE/PATCH /beeps/{id}`

Vue app.
- https://avatars.dicebear.com

**MENU**
```
home/posts    +add     admin                    login/logout/current user
 |              |       |                         |
 |              |       |                         +- show login button;
 |              |       |                            show logout button and the current user when authenticated
 |              |       |
 |              |       +- list of accounts
 |              |
 |              +- add post form
 |
 +- stream of posts
```


Slim package:
- [x] slim factory
- [x] auth mw
- [ ] wire genie DI bridge
- [x] cumulus


---


<!-- REFS -->
[demo]: https://beeps-microblog.herokuapp.com


