# Despliegue de Bookstore GCP

El codigo fuente de la aplicacion fue proporcionado por el curso de telematica por Edwin Montoya con el proposito de desplegar el codigo dockerizado con mayor disponibilidad a la version monolitica de wordpress.

## Setup
### Nginx
Nginx funciona como un balanceador de cargas, por eso en el upstream debe conocer los nodos del back para repartir mediante Round Robin las peticiones. Tambien requiere los certificados ssl para poder correr por el puerto 443.
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
