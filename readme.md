# Customer API

<p align="center">
  <image src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Logo-Stone.svg/480px-Logo-Stone.svg.png" alt="logo" />
</p>

<p align="center">
  <a href="#rocket-swagger">Swagger</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;
</p>

<p align="center">
  <a href="https://insomnia.rest/run/?label=customer-api&uri=https%3A%2F%2Fgithub.com%2Fmesquini%2Fstone-customer-api%2Fblob%2Fdev%2Fcustomer-api.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## :rocket: Swagger

#### Documentation

```http
  GET /swagger
```

#### Create one customer

```http
  POST /customers
```

#### Update one customer

```http
  PATCH /customers/:id
```

#### Get one customer by ID

```http
  GET /customers/:id
```

## :information_source: How To Use

```bash
# Clone this repository
$ git clone https://github.com/mesquini/proffy

> cd stone-customer-api

# run API local
> yarn
> yarn start:dev

# run API container
> docker-compose up
```

---

Made with ♥ by Victor Mesquini :wave: [Get in touch!](https://www.linkedin.com/in/mesquini/)
