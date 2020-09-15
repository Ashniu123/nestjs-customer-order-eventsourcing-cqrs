<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript example for event-sourcing. This is a monorepo.

There are 2 main parts of the application:

- _customer_: where a person is registered with minimum details and a initial balance amount
- _order_: where a customerId is used to order items for an amount. If the amount is less than balance then it is ACCEPTED otherwise REJECTED

No authentication, just plain and simple APIs.

## Installation

```bash
$ npm install
```

## Running the app

### Prereqs

- Kafka. Configurable through `KAFKA_BROKERS` env variable.
- MongoDB. Configurable through `CUSTOMERS_VIEW_SVC_MONGO_URI` and `ORDERS_VIEW_SVC_MONGO_URI` env variables.

```bash
# development
$ npm run start <service>

# watch mode
$ npm run start:dev <service>

# production mode
$ npm run start:prod <service>
```

The services are under `app/`, each folder is a separate service.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
