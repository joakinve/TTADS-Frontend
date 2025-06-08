# 📲 Pedidos Ágiles - Frontend - Sistema de Gestión (Angular)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Angular](https://img.shields.io/badge/Angular-16.x-red?logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-purple?logo=material-ui&logoColor=white)

Este proyecto es el frontend del sistema de gestión desarrollado en Angular. Está diseñado para interactuar con el backend a través de una API RESTful y proporcionar una interfaz moderna, intuitiva y responsiva para los usuarios.

---

## 📦 Tecnologías utilizadas

- [Angular](https://angular.io/) (v16.x o superior) ✔️ Framework principal
- [Angular Material](https://material.angular.io/) ✔️ Componentes UI modernos
- [Moment.js](https://momentjs.com/) ✔️ Manejo de fechas y horas
- [jsQR](https://github.com/cozmo/jsQR) ✔️ Lectura de códigos QR desde la cámara
- [qrcode](https://github.com/soldair/node-qrcode) ✔️ Generación de códigos QR
- [Font Awesome](https://fontawesome.com/) ✔️ Íconos visuales
- [jwt-decode](https://github.com/auth0/jwt-decode) ✔️ Decodificación de JWT
- [ngx-cookie-service](https://github.com/stevermeister/ngx-cookie-service) ✔️ Manejo de cookies
- [rxjs](https://github.com/ReactiveX/rxjs) ✔️ Programación reactiva

---

## 🚀 Inicio rápido

### 1. Clona el repositorio

```bash
git clone https://github.com/joakinve/TTADS-Frontend.git
cd TTADS-Frontend
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Ejecuta el servidor de desarrollo

```bash
ng serve
```

Luego abre tu navegador en `http://localhost:4200`.

---

## ⚙️ Configuración del entorno

Edita el archivo:

```bash
src/environments/environment.ts
```

Variables importantes:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  // otras variables necesarias...
};
```

---

## 🔐 Autenticación

- Login y registro con JWT
- Token almacenado en `localStorage`
- Uso de `jwt-decode` para extraer información del token
- Guardas de rutas para proteger componentes

---

## 🚀 Funcionalidades clave

- ✔️ CRUDs visuales conectados al backend
- ✔️ Visualización y generación de códigos QR
- ✔️ Escaneo de QR usando cámara (jsQR)
- ✔️ Interfaz responsiva con Angular Material
- ✔️ Navegación protegida mediante autenticación
- ✔️ Gestión de sesiones JWT
- ✔️ Interfaz amigable para la administración del sistema

---

## ⚗️ Testing

- Usa `Karma` + `Jasmine` para tests unitarios.
```bash
ng test
```

---

## 📦 Build para producción

```bash
ng build --configuration production
```

Los archivos generados se encuentran en `/dist/`.

---

## 📌 Consideraciones

- Asegúrate de que el backend esté corriendo y configurado en `environment.apiUrl`
- Las rutas y servicios están adaptados al backend documentado previamente
- Puedes usar herramientas como [Postman](https://www.postman.com/) o [Swagger UI](http://localhost:3000/api-docs) para verificar las rutas de la API

---

## 📤 Despliegue

Puedes desplegar esta aplicación en servicios como:
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Firebase Hosting](https://firebase.google.com/products/hosting)

---

## 🙋‍♂️ Contribuciones

Toda sugerencia, corrección o mejora es bienvenida. Abre un issue o un pull request.

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado por: 
* [Gonzalo Castillo](https://github.com/Gonza077)
* [Juan Frontons](https://github.com/Jufron97)
* [Joaquin Vedoya](https://github.com/joakinve)

---