# 🛒 API de Productos (Proyecto Final Back-End/Node.js)

API REST desarrollada en **Node.js** con **Express** que permite administrar el catálogo de productos de una tienda en línea.  
Incluye operaciones de lectura, creación, y eliminación de productos almacenados en **Firestore de Firebase**, con autenticación basada en **JWT** y documentación interactiva con **Swagger**.

---

## Requisitos

- Node.js instalado  
- Cuenta en Firebase con un proyecto de Firestore configurado  

---

## Instalación

```bash
npm install
```

---

## Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables (ver `.env.example`):

```env
PORT=3000

FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_STORAGE_BUCKET=tu_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
FIREBASE_APP_ID=tu_app_id

JWT_SECRET=tu_clave_secreta_para_jwt
```

---

## Uso

- Iniciar el servidor:
  
  ```bash
  npm run start
  ```

El servidor queda disponible en:  
👉 `http://localhost:3000`

La documentación Swagger está disponible en:  
👉 `http://localhost:3000/docs`

---

## Vercel

El servidor queda disponible en:  
👉 `http://localhost:3000`

La documentación Swagger está disponible en:  
👉 `http://localhost:3000/docs`

---

## 🔑 Endpoints

### Autenticación

- **Login**  
  `POST /api/auth/login`  
  Body:
  
  ```json
  {
    "username": "admin",
    "password": "1234"
  }
  ```

  Devuelve un **Bearer Token** que debe incluirse en el header `Authorization` de las rutas protegidas.

---

### Productos (rutas protegidas)

Todas las rutas requieren el header:

```
Authorization: Bearer <token>
```

- **Obtener todos los productos**: `GET /api/products`
- **Obtener un producto por ID**: `GET /api/products/:id`
- **Crear un producto**: `POST /api/products/create`  
- **Eliminar un producto**: `DELETE /api/products/:id`

---

## ⚠️ Manejo de errores

- `400` — faltan datos en la petición (Bad Request)  
- `401` — token no proporcionado o credenciales inválidas  
- `403` — token inválido o expirado  
- `404` — recurso no encontrado  
- `500` — error interno del servidor  

---

## Arquitectura

```
src/
 ├── index.js            # Configuración de Express
 ├── config/             # Configuraciónes
 ├── controllers/        # Controladores de rutas
 ├── security/           # Seguridad / Autenticación JWT 
 ├── handlers/           # Handlers 
 ├── models/             # Acceso a datos con Firestore
 ├── routes/             # Definición de rutas
 └── services/           # Lógica de negocio
```

---

## Tecnologías utilizadas

- Node.js  
- Express  
- ESModules  
- Firebase / Firestore  
- JSON Web Token (JWT)  
- dotenv  
- CORS  
- Swagger (documentación interactiva)  

---
