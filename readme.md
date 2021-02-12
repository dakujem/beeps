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

Deploy to heroku:
```
$ git push heroku trunk:main --force
```


## Why

> 🚧 Detailed blog posts are being prepared...

While the app is missing important parts like 
proper serializers, error handling, automated client app deployment and some other stuff,
it's a solid source of knowledge for starting developers, I think.

It's also a good reference when you
- want to **start a Slim based API**
- want to set up **authorization middleware** and **authentication middleware**
- want to see **automatic dependency injection** in action

... and yes, I wanted to test a pattern or two using Vue.


## Tech

- [Slim] (v4) PHP framework
- [Vue] JS framework
- [Bulma] CSS framework
- [Auth Middleware]
  - authentication and authorization
- [Wire Genie]
  - automatic dependency injection
- [Cumulus]
- [Sleeve]
- [dibi]
- [Avatars]


## Todos

- [ ] wire genie DI bridge


## Contributing and further development

Sure, I'll accept PRs and issues.

In the future, I may add update/remove actions for owned beeps (`DELETE/PATCH /beeps/{id}`),
error handling and serializers.


<!-- REFS -->
[demo]: https://beeps-microblog.herokuapp.com

[Slim]: https://www.slimframework.com
[Vue]: https://vuejs.org
[Bulma]: https://dibiphp.com/en/
[Auth Middleware]: https://github.com/dakujem/auth-middleware
[Cumulus]: https://github.com/dakujem/cumulus
[Sleeve]: https://github.com/dakujem/sleeve
[Wire Genie]: https://github.com/dakujem/wire-genie
[dibi]: https://dibiphp.com/en/
[Avatars]: https://avatars.dicebear.com
<!-- REFS -->

