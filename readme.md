For Live Fraud Detector by
Kyndryl x MongoDB
===

Abstract:xxx

## Install & Dependence

- [nodejs & npm](https://nodejs.org/en/)
- [mongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)
- [python](https://www.python.org/downloads/)

## Use setup

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

## Model schema

| Model | Download |
| ---     | ---   |
| Model-1 | [download]() |
| Model-2 | [download]() |
| Model-3 | [download]() |

## Directory Hierarchy
```
|—— .github
|    |—— workflows
|        |—— nodejs.yml
|—— .gitignore
|—— apps
|    |—— .env
|    |—— .env.local
|    |—— certs
|        |—— admin-temp.key
|        |—— admin.csr
|        |—— admin.key
|        |—— admin.pem
|        |—— ca.key
|        |—— ca.pem
|    |—— package-lock.json
|    |—— package.json
|    |—— README.md
|    |—— server.js
|    |—— setup.sh
|    |—— src
|        |—— config
|            |—— constantes.js
|            |—— endpoint.config.js
|            |—— non-fraud.constantes.js
|        |—— controllers
|            |—— adress.controller.js
|            |—— auth.controller.js
|            |—— country.controller.js
|            |—— dataset-non-fraud.controller.js
|            |—— dataset.controller.js
|            |—— product.controller.js
|            |—— user.controller.js
|        |—— middlewares
|            |—— authJwt.js
|            |—— index.js
|            |—— verifySignUp.js
|        |—— models
|            |—— adress.model.js
|            |—— country-code.model.js
|            |—— dataset.model.js
|            |—— index.js
|            |—— product.model.js
|            |—— role.model.js
|            |—— user.model.js
|        |—— routes
|            |—— adress.route.js
|            |—— auth.routes.js
|            |—— dataset.route.js
|            |—— user.routes.js
|        |—— services
|            |—— dataset.service.js
|            |—— init.service.js
|            |—— signature.service.js
|        |—— swagger.json
|—— data_template
|    |—— archi-traitment.drawio
|    |—— CountryCodes.json
|    |—— data_dictionnary_fraud.txt
|    |—— data_dictionnary_fraud2.txt
|    |—— data_dictionnary_nonfraud.txt
|    |—— data_template.json
|—— load.py
|—— main.py
|—— mongo.py
|—— README.md

```

## Code Details

### Tested Platform

- software

  ```
  OS: Debian unstable (May 2021), Ubuntu LTS
  Python: 3.8.5 (anaconda)
  PyTorch: 1.7.1, 1.8.1
  ```

- hardware

  ```
  CPU: Intel Xeon 6226R
  GPU: Nvidia RTX3090 (24GB)
  ```

### Hyper parameters

```
```

## References

- [paper-1]()
- [paper-2]()
- [code-1](https://github.com)
- [code-2](https://github.com)
  
## License

## Citing

If you use xxx,please use the following BibTeX entry.