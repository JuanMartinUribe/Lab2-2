# Despliegue de Bookstore GCP

El codigo fuente de la aplicacion fue proporcionado por el curso de telematica por Edwin Montoya con el proposito de desplegar el codigo dockerizado con mayor disponibilidad a la version monolitica de wordpress.

## Setup
### Nginx
Nginx funciona como un balanceador de cargas, por eso en el upstream debe conocer los nodos del back para repartir mediante Round Robin las peticiones. Tambien requiere los certificados ssl para poder correr por el puerto 443.
Para generar los certificados :

`sudo certbot --nginx certonly`
```
worker_processes 4;
events { worker_connections 1024; }
http {
    upstream backend{
        server 35.202.15.20:5000;
        server 34.121.76.81:5000;
    }
    server {
        listen 443 ssl;
        server_name www.gcpbookstore.tk;
	ssl_certificate /etc/letsencrypt/live/www.gcpbookstore.tk/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/www.gcpbookstore.tk/privkey.pem;
        root  /usr/share/nginx/html;
        include /etc/nginx/mime.types;
        location /appui {
            try_files $uri /index.html;
        }
        location /api/books{
            proxy_pass http://backend;
        }

        
    }
    server {
        listen 80;
        listen [::]:80;

        server_name www.gcpbookstore.tk;
        #rewrite ^(.*) https://$host$1 permanent;

        return 301 https://gcpbookstore.tk$request_uri;
    }

}
```
### Dockerfile frontend
Para construir la imagen a partir el docker file, que se encuentra en el directorio frontend del repositorio,
`docker build -f Dockerfile -t <nombre> . `

### Dockerfile backend
Para construir la imagen a partir el docker file, que se encuentra en el directorio backend del repositorio,
`docker build -f Dockerfile -t <nombre> . `

## Mongo
Con mongo instalado, correr el `comando mongo mongodb://localhost:27017`, con el puerto 27017 abierto

Desde el `shell`
```
> use admin
> db.createUser(
{
user: "Admin",
pwd: "myNewPassword",
roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
}
);
```
`sudo service mongodb restart`
### variable de entorno en el dockerfile
Para asociar la base de datos en el dockerfile o en el docker run asociar la variable de entorno 

`ENV URL_DB_CONNECTION = mongodb://localhost:27017/bookstore`


o si se utiliza mongo atlas cloud  

`ENV URL_DB_CONNECTION = mongodb+srv://<user>:<password>@mongo.kuhec.mongodb.net/<database>?retryWrites=true&w=majority`

### Ejecucion
#### las dos instancias del back deben correr el mismo dockerfile con su respectiva configuracion url_db_connection
#### La instancia del front debe correr el dockerfile con nginx configurado con los pasos dados, y si se desea añadir mas nodos del back se deben colocar en el `upstream`
