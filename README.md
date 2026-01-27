# Agencia de Viajes Oeste — Autenticación Local y GitHub

Aplicación desarrollada para la asignatura Desarrollo Frontend III

La aplicación implementa:
- Registro y Login local (Node.js + Express)
- Autenticación GitHub OAuth
- Rutas protegidas
- Dashboard con información del usuario
- Logout completo
- Persistencia local en archivo JSON

Todo funciona en entorno local.

---

## Requisitos

- Node.js
- npm

Verificar:
node -v
npm -v

---

## Instalación

### 1) Clonar el repositorio

git clone https://github.com/Adversario/agencia-viajes-oeste-auth
cd agencia-viajes-oeste-auth

### 2) Instalar dependencias del Frontend

npm install

### 3) Instalar dependencias del Backend

cd backend
npm install

---

## Variables de entorno

El archivo .env viene incluido en este repositorio con credenciales ya completadas para que funcione la aplicación.

Ubicación del archivo:
backend/.env

---

## Ejecución (2 terminales)

### Terminal 1 — Backend

cd backend
npm run dev

Debe mostrar:
Backend corriendo en http://localhost:4000

### Terminal 2 — Frontend

Desde la raíz del proyecto:

npm start

Abrir en el navegador:
http://localhost:3000

---

## Usuarios de prueba

### Usuario local (persistido en users.json)

Email: hola@correo.cl  
Password: 123456

También es posible registrar nuevos usuarios desde la pantalla de Registro.

## Flujo de la aplicación

### Login Local

1. Ir a /login
2. Ingresar email y password
3. Acceso al Dashboard
4. Token JWT guardado en localStorage

### Login con GitHub

1. En /login hacer clic en “Iniciar sesión con GitHub”
2. Autorizar en GitHub
3. Redirección automática al Dashboard
4. Se muestran los datos del usuario GitHub

### Logout

- Elimina el token y los datos de sesión
- Redirige a /login
- Impide volver al Dashboard sin autenticación
