# 📚 Biblioteca María Moliner - API

## ✨ Descripción

La **Biblioteca María Moliner** es una API diseñada para gestionar una biblioteca virtual, permitiendo a los usuarios crear, reservar y gestionar libros a través de funcionalidades de autenticación y manejo de usuarios. Esta API está construida con el framework **NestJS** y utiliza una estructura modular para facilitar su escalabilidad y mantenimiento.

## 🚀 Funcionalidades Principales

- **🔐 Autenticación de Usuarios**: Permite el registro, inicio de sesión y autenticación segura mediante JWT.
- **📖 Gestión de Libros**: CRUD (Crear, Leer, Actualizar y Eliminar) de libros con información relevante (título, autor, disponibilidad).
- **📅 Reservaciones**: Permite a los usuarios reservar libros y verificar la disponibilidad.
- **👤 Gestión de Usuarios**: CRUD de usuarios y administración de roles (administrador y usuario estándar).
- **🔒 Control de Acceso**: Roles y permisos para limitar el acceso a ciertos recursos según el rol del usuario.

## 🗂️ Estructura del Proyecto

```bash
src/
├── auth/               # Módulo de autenticación y autorización
├── libros/             # Módulo de gestión de libros
├── reservaciones/      # Módulo para crear y gestionar reservaciones de libros
├── usuario/            # Módulo de usuarios y administración de roles
└── main.ts             # Punto de entrada de la aplicación

```

## 🛠️ Requisitos Previos

- Node.js (versión 14 o superior)
- NestJS (versión 8 o superior)
- Docker (opcional para contenedores y base de datos)
- Base de datos MySQL

## 📥 Instalación

1. Clonar el repositorio:
    
    ```bash
    
    git clone https://github.com/Julian954/Biblioteca_Maria_Moliner.git
    cd biblioteca-maria-moliner
    
    ```
    
2. Instalar dependencias:
    
    ```bash

    npm install
    
    ```
    
3. Configurar las variables de entorno en el archivo `.env` (modificar el archivo `.env.example`  y cambiarlo a `.env` y modificar según sea necesario):
    
    ```makefile

    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=password
    DB_DATABASE=biblioteca
    JWT_SECRET=supersecreto

    ```
    
## 🐳 Despliegue con Docker

Puedes usar el archivo `docker-compose.yml` para levantar el entorno completo con Docker:

```bash

docker-compose up -d

```
    

## 🏗️ Ejecución del Proyecto

### 💻 Modo de Desarrollo

Para ejecutar el proyecto en modo desarrollo con auto-reload:

```bash

npm run start:dev

```

### 🚀 Modo de Producción

Para compilar y ejecutar el proyecto en modo producción:

```bash

npm run start:prod

```

### 🔍 Ejecutar Pruebas

El proyecto incluye pruebas unitarias y de integración:

```bash

# Pruebas unitarias
npm run test

# Pruebas E2E
npm run test:e2e

# Cobertura de pruebas
npm run test:cov

```

## 📡 Endpoints Principales

| Método | Endpoint | Descripción |
| --- | --- | --- |
| POST | `/auth/register` | Registro de nuevos usuarios |
| POST | `/auth/login` | Inicio de sesión |
| GET | `/libros` | Obtener la lista de libros |
| POST | `/libros` | Crear un nuevo libro |
| PATCH | `/libros/:id` | Actualizar información de un libro |
| DELETE | `/libros/:id` | Eliminar un libro |
| POST | `/reservaciones` | Crear una nueva reservación |
| GET | `/reservaciones` | Obtener todas las reservaciones |

## 🤝 Contribución

Si deseas contribuir a este proyecto, sigue los siguientes pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y realiza un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Envía tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request y describe tus cambios.
