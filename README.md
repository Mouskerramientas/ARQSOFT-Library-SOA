# API de Librería (SOA)

Este proyecto es una API basada en Service-Oriented Architecture (SOA) para gestionar una librería. La API está desarrollada con ExpressJS y TypeScript, utiliza PostgreSQL como base de datos y Prisma como ORM. Además, se puede ejecutar en un entorno Dockerizado para facilitar el desarrollo y despliegue.

## Características principales

La API consta de tres servicios principales:

### Servicio de Libros:

- Maneja la información de los libros disponibles en la librería.
- Endpoints: `POST /libros`, `GET /libros`, `GET /libros/{id}`, `PUT /libros/{id}`, `DELETE /libros/{id}`.

### Servicio de Clientes:

- Administra la información de los clientes registrados.
- Endpoints: `POST /clientes`, `GET /clientes`, `GET /clientes/{id}`, `PUT /clientes/{id}`, `DELETE /clientes/{id}`.

### Servicio de Pedidos:

- Gestiona los pedidos realizados por los clientes.
- Endpoints: `POST /pedidos`, `GET /pedidos`, `GET /pedidos/{id}`, `PUT /pedidos/{id}`, `DELETE /pedidos/{id}`.

## Tecnologías utilizadas

- **Backend**: Node.js, Express, TypeScript.
- **Base de datos**: PostgreSQL.
- **ORM**: Prisma.
- **Contenedores**: Docker.
- **Gestión de variables de entorno**: .env.

## Requisitos previos

- Node.js
- Docker y Docker Compose.

## Configuración del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/libreria-soa.git
cd libreria-soa
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Puerto de la aplicación
PORT=3000

# Configuración de PostgreSQL
DATABASE_URL="postgresql://user:password@db:5432/libreria"
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=libreria
```

### 3. Ejecutar con Docker

Construir y levantar los contenedores:

```bash
docker-compose up --build
```

Acceder a la API:

- La API estará disponible en http://localhost:3000.

Detener los contenedores:

```bash
docker-compose down
```

## Estructura del proyecto

```
src/
├── servicios/
│   ├── libros/
│   │   ├── controllers/
│   │   └── routes/
│   ├── clientes/
│   │   ├── controllers/
│   │   └── routes/
│   └── pedidos/
│       ├── controllers/
│       └── routes/
├── middlewares/
├── prisma.ts
└── index.ts
```

## Endpoints de la API

### Servicio de Libros

- `POST /libros`: Agregar un nuevo libro.
- `GET /libros`: Listar todos los libros.
- `GET /libros/{id}`: Obtener información de un libro específico.
- `PUT /libros/{id}`: Actualizar la información de un libro.
- `DELETE /libros/{id}`: Eliminar un libro.

### Servicio de Clientes

- `POST /clientes`: Registrar un nuevo cliente.
- `GET /clientes`: Listar todos los clientes.
- `GET /clientes/{id}`: Obtener información de un cliente específico.
- `PUT /clientes/{id}`: Actualizar la información de un cliente.
- `DELETE /clientes/{id}`: Eliminar un cliente.

### Servicio de Pedidos

- `POST /pedidos`: Crear un nuevo pedido.
- `GET /pedidos`: Listar todos los pedidos.
- `GET /pedidos/{id}`: Obtener información de un pedido específico.
- `PUT /pedidos/{id}`: Actualizar el estado de un pedido.
- `DELETE /pedidos/{id}`: Cancelar un pedido.

## Ejemplos de uso

### Agregar un libro

```bash
curl -X POST http://localhost:3000/libros \
-H "Content-Type: application/json" \
-d '{
  "titulo": "Cien años de soledad",
  "autor": "Gabriel García Márquez",
  "genero": "Realismo Mágico",
  "precio": 45000,
  "stock": 20
}'
```

### Crear un pedido

```bash
curl -X POST http://localhost:3000/pedidos \
-H "Content-Type: application/json" \
-d '{
  "clienteId": 1,
  "libroId": 1,
  "cantidad": 2,
  "estado": "Pendiente"
}'
```
