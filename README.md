# Agencia de Viajes Oeste — Autenticación Local y GitHub

Aplicación desarrollada para la asignatura Desarrollo Frontend III
Este repositorio contiene la evolución progresiva del proyecto desde autenticación básica hasta optimización avanzada con Next.js.

# Funcionalidades implementadas

## Autenticación

- Registro y Login local
- JWT almacenado en localStorage
- Rutas protegidas
- Logout seguro
- OAuth 2.0 con GitHub
- Validaciones frontend + backend
- Persistencia en users.json

## SSR Manual

- Express + ReactDOMServer
- renderToString
- Hydration con hydrateRoot
- Persistencia simulada

## Next.js SSR

- App Router
- Server Components
- Fetch en servidor (cache: no-store)
- Formulario validado
- Filtrado por estado
- Persistencia simulada (JSON)
- Eliminación de solicitudes

## Optimización

- Modularización real con next/dynamic
- Lazy loading de:
  - Formulario
  - Filtro
  - Modal de eliminación
- Skeleton animado con espera simulada (3s)
- Control por rol:
  - Agente → ve todas las solicitudes
  - Cliente → ve solo las asociadas
- Validaciones completas frontend + backend
- SSR mantenido correctamente

# Requisitos

- Node.js 18+
- npm 9+

Verificar:

node -v


npm -v

# Cómo ejecutar cada módulo

## Autenticación

cd backend


npm install


npm run dev

http://localhost:4000/

## Frontend

npm install


npm start

http://localhost:3000/

## Backend REST

cd backend-tareas


npm install


npm run dev

http://localhost:6060/

Persistencia: backend-tareas/data/solicitudes.json

## Next.js

cd nextjs-app


npm install


npm run dev

http://localhost:3001/

# Usuario de prueba de autenticación local

Email: hola@correo.cl
Password: 123456

También es posible registrar nuevos usuarios.