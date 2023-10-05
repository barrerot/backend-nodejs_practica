
# Nodepop

Esta API ha sido Consiste en un backend construido con Express, NodeJS y MongoDB.

# Nodepop

Website and API application.

## Install

Install dependencies:

```sh
$ npm install
```

Review database connection on /lib/connectMongoose.js (see "Start a MongoDB Server in MacOS or Linux")

Load initial data:

```sh
# this command deletes all the data in the database and create default data
$ npm run install-db
```

## Start
In production:

```sh
npm start
```

In development:

```sh
npm run dev
```

## Start a MongoDB Server in MacOS or Linux

From the folder of the server:

```sh
./bin/mongod --dbpath ./data
```

## API Endpoints


## ### Parámetros de consulta


Cualquier solicitud de acceso a los anuncios almacenados puede efectuarse a través de dos métodos diferentes:

- Realizar consultas directas mediante una URL, lo que resultará en una página con los anuncios filtrados.
- Realizar consultas a la API como un servicio, lo que generará un archivo JSON como respuesta.
Ambas vías de consulta admiten los mismos parámetros. Un ejemplo de consulta seria:
```
localhost:3000/anuncios?type=compra&type=venta&tags=work&range=10-100&limit=3&skip=3&sort=nombre
```

Los parámetros aceptados son:
- **Name**: El nombre de un artículo. No distingue minúsculas de mayúsculas.
- **Tags**: El nombre de un tag o categoría.
- **Type**: Venta o Compra según el tipo de anuncio.
- **Range**: Precio mínimo y máximo separado por un guión.
- **Limit**: Número máximo de anuncios a devolver.
- **Skip**: Número de anuncios a saltar. En caso de paginación.
- **Sort**: Campo por el cual se ordena . si ponemos un meno de lante el orden es descendente

### GET /api/anuncios/
Devuelve un JSON  con los anuncios filtrados por los parámetros pasados

Por ejemplo http://localhost:3000/api/anuncios?type=venta&tags=lifestyle
devuelve:


```json
{"success":true,"result":[{"_id":"651c3fffe8392d5b2a747419","nombre":"Moto agua yamaha gp 1300R 2008","venta":true,"precio":1500,"foto":"motoagua.jpg","tags":["lifestyle","motor"],"__v":0},{"_id":"651c3fffe8392d5b2a74741b","nombre":"Ipad Pro 12,9 pulgadas 512Gb Plata","venta":true,"precio":1000,"foto":"ipad_pro.jpg","tags":["lifestyle","work","tech"],"__v":0},{"_id":"651c3fffe8392d5b2a74741c","nombre":"Negra TUMI Brief Pack ALPHA 3","venta":true,"precio":275,"foto":"mochila.jpg","tags":["lifestyle","work"],"__v":0},{"_id":"651c3fffe8392d5b2a74741d","nombre":"Collar de ónix","venta":true,"precio":75,"foto":"collar.jpg","tags":["lifestyle","joyeria"],"__v":0},{"_id":"651c3fffe8392d5b2a74741e","nombre":"pulsera Pandora","venta":true,"precio":1300,"foto":"pulsera.jpg","tags":["lifestyle","joyeria"],"__v":0}]}
```
### GET /api/anuncios/tags
Devuelve un JSON  con todos los tags de los anuncios
Por ejemplo: http://localhost:3000/api/anuncios/tags
devuelve:


```json
{"success":true,"result":["lifestyle","motor","work","tech","joyeria"]}
```
### POST /api/anuncios/

Introduce un nuevo artículo
hay que pasarle los datos en el body con formatodata-urlencode

ejemplo de un curl 
curl --location 'http://localhost:3000/api/anuncios' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'nombre=Bicicleta' \
--data-urlencode 'venta=true' \
--data-urlencode 'precio=230.15' \
--data-urlencode 'foto=bici.jpg' \
--data-urlencode 'tags=["lifestyle", "motor"]'


Devuelve un JSON con el anuncio insertado

```json

{
    "success": true,
    "result": {
        "nombre": "Bicicleta",
        "venta": true,
        "precio": 230.15,
        "foto": "bici.jpg",
        "tags": [
            "[\"lifestyle\", \"motor\"]"
        ],
        "_id": "651c5d26fe15adb73ed85c02",
        "__v": 0
    }
}
```

