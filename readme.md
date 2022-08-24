For Live Fraud Detector by
Kyndryl x MongoDB
===

Abstract:xxx

## Install & Dependence

- [nodejs & npm](https://nodejs.org/en/)
- [mongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)
- [python](https://www.python.org/downloads/)
- [Postman](https://www.postman.com/)

## Use setup app in localhost

- Clone the repo and install the dependencies.

  ```bash
  # clone repo
  git clone https://github.com/datalab-api/live-fraud-detector.git 
  ```

  ```bash
  # you may want to move in directory : live-fraud-detector/apps/
  cd live-fraud-detector/apps/
  ```

   ```bash
  # install dependancies
  npm install 
  ```

- for generate the certificates of your api nodejs

  ```bash
  # you can exec the file setup.sh
  bash setup.sh
  ```

- Start your app

  ```bash
  npm start  
  ```
  
- login your app from to generate token JWT

  ```bash
  # curl command or Postman API
  curl --location --request POST 'https://live-fraud-detector.eu-gb.mybluemix.net/api/REST/services/v1/oauth/token/login' \
  --header 'Authorization: Basic YWRtaW46S3luZHJ5MjAyMSQ='
  ```

   ```bash
    # Response : token JWT was created 
    {
      "code": 200,
      "message": {
          "id": "62f3ce867b6eae0b1a552068",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjNjZTg2N2I2ZWFlMGIxYTU1MjA2OCIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6Im1hbWFkb3UuY2lyZS5ndWlzc2VAa3luZHJ5bC5jb20iLCJyb2xlIjpbIlJPTEVfQURNSU4iXSwidHlwZSI6IkJlYXJlciIsImlhdCI6MTY2MTM0MjE1MiwiZXhwIjoxNjYxMzQzOTUyfQ.c4nNXjD99v6cKgKK26_T7pjNqHURGY8hBnlwre9LeH4"
      }
    }
  ```

## Use setup app deployed in IBM CLoud foundry 
We can using this command line from to using Database Mongo Atlas and app cloud foundry 
- login your app from to generate token JWT

  ```bash
  # curl command or Postman API
  curl --location --request POST 'https://live-fraud-detector.eu-gb.mybluemix.net/api/REST/services/v1/oauth/token/login' \
  --header 'Authorization: Basic YWRtaW46S3luZHJ5MjAyMSQ='
  ```

   ```bash
    # Response : token JWT was created 
    {
      "code": 200,
      "message": {
          "id": "62f3ce867b6eae0b1a552068",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjNjZTg2N2I2ZWFlMGIxYTU1MjA2OCIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6Im1hbWFkb3UuY2lyZS5ndWlzc2VAa3luZHJ5bC5jb20iLCJyb2xlIjpbIlJPTEVfQURNSU4iXSwidHlwZSI6IkJlYXJlciIsImlhdCI6MTY2MTM0MjE1MiwiZXhwIjoxNjYxMzQzOTUyfQ.c4nNXjD99v6cKgKK26_T7pjNqHURGY8hBnlwre9LeH4"
      }
    }
  ```
  
- Get datasets your app API REST

  ```bash
    curl --location --request GET 'https://live-fraud-detector.eu-gb.mybluemix.net/api/REST/services/v1/adresses?state=FR' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjNjZTg2N2I2ZWFlMGIxYTU1MjA2OCIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6Im1hbWFkb3UuY2lyZS5ndWlzc2VAa3luZHJ5bC5jb20iLCJyb2xlIjpbIlJPTEVfQURNSU4iXSwidHlwZSI6IkJlYXJlciIsImlhdCI6MTY2MTM0MjE1MiwiZXhwIjoxNjYxMzQzOTUyfQ.c4nNXjD99v6cKgKK26_T7pjNqHURGY8hBnlwre9LeH4'
  ```
  
  ```bash
    # Response 
    {
      "code": 200,
      "total_count": 4991,
      "addresses": [
          {
              "state": "FR",
              "name": "Abainville",
              "region": "Meuse",
              "city": "Abainville",
              "prov": "Grand Est",
              "latt": "48.53139",
              "longt": "5.49444",
              "address": "19, rue Salmonn02933 Alexandre",
              "updatedAt": "2022-08-10T15:28:03.964Z"
          },
    .......
  ```

- Generate Datasets by type (fraud, fraud2, non-fraud)

  ```bash
  curl --location --request POST 'https://live-fraud-detector.eu-gb.mybluemix.net/api/REST/services/v1/datasets/${type}/add?number=50' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjNjZTg2N2I2ZWFlMGIxYTU1MjA2OCIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6Im1hbWFkb3UuY2lyZS5ndWlzc2VAa3luZHJ5bC5jb20iLCJyb2xlIjpbIlJPTEVfQURNSU4iXSwidHlwZSI6IkJlYXJlciIsImlhdCI6MTY2MTMzMzMzMywiZXhwIjoxNjYxMzM1MTMzfQ.kkyBf9TQdhMEVvz6PSK5y6adXtWh-s5uOHhqa4zY490'
  ```

  ```bash
  #Responses
  {
    "code": 201,
    "message": " ${number} dataset ${type} added with  successfully"
  }
  ```

## Directory Hierarchy

```
|—— .cfignore
|—— .dockerignore
|—— .env
|—— .env.local
|—— .github
|    |—— workflows
|        |—— nodejs.yml
|—— .gitignore
|—— certs
|    |—— admin.csr
|    |—— admin.key
|    |—— admin.pem
|    |—— ca.key
|    |—— ca.pem
|    |—— public.key
|—— data_template
|    |—— archi-traitment.drawio
|    |—— CountryCodes.json
|    |—— data_dictionnary_fraud.txt
|    |—— data_dictionnary_fraud2.txt
|    |—— data_dictionnary_nonfraud.txt
|    |—— data_template.json
|    |—— Generate_random_addresses.ipynb
|—— docker
|    |—— docker-compose.debug.yml
|    |—— docker-compose.yml
|    |—— generate_data.py
|—— Dockerfile
|—— log.txt
|—— manifest.yml
|—— ML
|    |—— datasets.json
|    |—— data_processing.ipynb
|—— package-lock.json
|—— package.json
|—— server.js
|—— setup.sh
|—— src
|    |—— config
|        |—— constantes.js
|        |—— endpoint.config.js
|    |—— controllers
|        |—— address.controller.js
|        |—— auth.controller.js
|        |—— country.controller.js
|        |—— dataset.controller.js
|        |—— product.controller.js
|        |—— user.controller.js
|    |—— middlewares
|        |—— authJwt.js
|        |—— index.js
|        |—— verifySignUp.js
|    |—— models
|        |—— adress.model.js
|        |—— country-code.model.js
|        |—— dataset.model.js
|        |—— index.js
|        |—— product.model.js
|        |—— role.model.js
|        |—— user.model.js
|    |—— routes
|        |—— address.route.js
|        |—— auth.routes.js
|        |—— dataset.route.js
|        |—— user.routes.js
|    |—— services
|        |—— index.js
|        |—— init.service.js
|        |—— signature.service.js
|    |—— swagger.json
|    |—— swagger.yaml
```

## Swagger  API REST 
We can copy this link in you web browser. 
  ```bash
  https://live-fraud-detector.eu-gb.mybluemix.net/api/REST/swagger/  
  ```

  
## License

