# Gestión de Usuarios | Fase 1

Aplicación web desarrollada con **React 19, TypeScript, Vite, React Router y Bootstrap 5** para consultar y administrar usuarios. En esta primera fase los datos se almacenan **únicamente en `localStorage`**, por lo que **no se requiere iniciar Spring Boot, MySQL ni instalar Axios**.

> **Propósito académico:** contar con una aplicación frontend organizada y funcional que luego pueda conectarse a una API REST. El objetivo es entender qué cambia cuando reemplazamos almacenamiento local por peticiones HTTP, sin reconstruir toda la interfaz.

## 1. Tecnologías

- **React 19:** interfaz basada en componentes funcionales y Hooks.
- **TypeScript:** tipado del modelo de usuario, componentes y funciones.
- **Vite:** entorno de desarrollo y compilación.
- **React Router:** navegación entre páginas sin recargas completas.
- **Bootstrap 5:** estilos y diseño adaptable a distintas pantallas.
- **localStorage:** persistencia local en el navegador (sin servidor).

## 2. Requisitos y ejecución

Necesitas **Node.js** y **npm**, usando una versión de Node compatible con la versión de Vite instalada (para Vite 7, Node.js 20.19+ o 22.12+).

```bash
npm install
npm run dev
```

Abre la URL que muestre la terminal, generalmente **http://localhost:5173**.

Otros comandos disponibles:

```bash
npm run build    # Compila la aplicación para producción
npm run preview  # Previsualiza la compilación
```

## 3. Funcionalidades de la primera fase

- Página de inicio, página de usuarios, página informativa y ruta para páginas inexistentes.
- Layout compartido con barra de navegación (**Navbar**) y pie de página (**Footer**).
- Listado de usuarios en una tabla.
- Registro de usuarios mediante formulario con campos controlados.
- Búsqueda por nombre y apellido.
- Filtro por tipo de usuario: **VIP** o **regular**.
- Resumen de cantidad total de usuarios y usuarios VIP.
- Eliminación de usuarios con **modal de confirmación** (en lugar de `window.confirm`).
- Persistencia de los cambios al recargar la página, mediante `localStorage`.
- Datos iniciales de prueba la primera vez que se utiliza la aplicación.
- Imagen `public/icon-duoc.png` utilizada como favicon y/o logo, si se configuró en `index.html` y `Navbar.tsx`.

**Alcance:** no incorpora inicio de sesión, permisos, edición de usuarios, base de datos compartida ni conexión a un backend. Tampoco utiliza Axios en esta fase.

## 4. Modelo de datos

Archivo: `src/types/Usuario.ts`.

```ts
export type TipoUsuario = "vip" | "regular";

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  tipo: TipoUsuario;
}

export type NuevoUsuario = Omit<Usuario, "id">;
```

| Campo      | Tipo                 | Descripción                                                   |
| ---------- | -------------------- | ------------------------------------------------------------- |
| `id`       | `number`             | Identificador del usuario. Se genera al registrar un usuario. |
| `nombre`   | `string`             | Nombre del usuario.                                           |
| `apellido` | `string`             | Apellido del usuario.                                         |
| `edad`     | `number`             | Edad del usuario.                                             |
| `tipo`     | `"vip" \| "regular"` | Clasificación del usuario.                                    |

`NuevoUsuario` representa los datos recibidos desde el formulario, **sin `id`**: el servicio lo agrega cuando guarda el registro.

## 5. Organización del proyecto

```text
gestion-usuarios/
├── public/
│   └── icon-duoc.png             # Imagen incorporada para logo/favicon
├── src/
│   ├── components/
│   │   ├── ConfirmarEliminacion.tsx  # Modal de confirmación
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── UsuarioBadge.tsx
│   │   ├── UsuarioFormulario.tsx
│   │   └── UsuarioTabla.tsx
│   ├── data/
│   │   └── usuariosIniciales.ts  # Datos de demostración
│   ├── layouts/
│   │   └── MainLayout.tsx        # Estructura común de las páginas
│   ├── pages/
│   │   ├── InicioPage.tsx
│   │   ├── UsuariosPage.tsx      # Estados y lógica de la pantalla
│   │   ├── AcercaPage.tsx
│   │   └── NoEncontradoPage.tsx
│   ├── services/
│   │   └── usuarioService.ts     # Operaciones síncronas sobre localStorage
│   ├── types/
│   │   └── Usuario.ts            # Interfaces y tipos
│   ├── App.tsx                   # Definición de rutas
│   ├── main.tsx                  # Punto de entrada
│   └── styles.css                # Estilos complementarios
├── index.html
├── package.json
└── README.md
```

> La estructura refleja la versión trabajada durante la clase, incluido el componente de confirmación y el ícono agregados posteriormente al proyecto base.

## 6. ¿Dónde se guardan los usuarios?

La aplicación **no guarda usuarios en archivos del proyecto**. Utiliza la clave **`gestion-usuarios-v1`** dentro de `localStorage` del navegador.

El flujo de lectura es:

1. `UsuariosPage.tsx` llama a `usuarioService.obtenerTodos()` al montar la página.
2. `usuarioService.ts` intenta leer la clave `gestion-usuarios-v1`.
3. Si **no existe** esa clave, guarda los usuarios definidos en `src/data/usuariosIniciales.ts` y los devuelve.
4. Si la clave **ya existe**, devuelve los usuarios almacenados, incluso cuando el arreglo está vacío (`[]`).
5. React actualiza el estado `usuarios` y muestra el listado mediante `UsuarioTabla`.

### Reiniciar los datos de demostración

Desde la consola del navegador, en la aplicación:

```js
localStorage.removeItem("gestion-usuarios-v1");
location.reload();
```

Esto **borra los usuarios registrados localmente bajo esa clave** y recupera los datos de ejemplo. No ejecutes este comando si necesitas conservar esos registros.

También puedes revisar los datos desde las herramientas del navegador: **DevTools → Application → Local Storage → origen de la aplicación**.

## 7. ¿Qué hace cada parte?

| Archivo                    | Función principal                                              |
| -------------------------- | -------------------------------------------------------------- |
| `usuariosIniciales.ts`     | Define los usuarios disponibles para la carga inicial.         |
| `usuarioService.ts`        | Lee, agrega y elimina usuarios en `localStorage`.              |
| `UsuariosPage.tsx`         | Controla estados, búsqueda, filtros, formulario y eliminación. |
| `UsuarioFormulario.tsx`    | Captura y valida información para registrar un nuevo usuario.  |
| `UsuarioTabla.tsx`         | Presenta el listado y comunica las solicitudes de eliminación. |
| `ConfirmarEliminacion.tsx` | Solicita confirmación antes de borrar un registro.             |
| `MainLayout.tsx`           | Reutiliza la estructura de navegación y pie de página.         |
| `App.tsx`                  | Define las rutas de navegación de la aplicación.               |

### Ejemplo: lectura síncrona

```ts
function cargarUsuarios() {
  const datos = usuarioService.obtenerTodos();
  setUsuarios(datos);
}
```

### Ejemplo: guardar un usuario

```ts
function guardarUsuario(nuevo: NuevoUsuario) {
  usuarioService.crear(nuevo);
  cargarUsuarios();
  setMostrarFormulario(false);
}
```

En ambos ejemplos **no usamos `async` ni `await`**: `localStorage` es síncrono. El servicio puede seguir lanzando errores (por ejemplo, si el navegador no permite guardar datos); la simplificación usada en clase no reemplaza el manejo de errores de una aplicación de producción.

## 8. Conceptos de React practicados

- **Componentes:** dividir la pantalla en piezas con responsabilidades específicas.
- **Props:** enviar datos y funciones entre componentes (`onGuardar`, `onEliminar`).
- **`useState`:** administrar el listado, la búsqueda, el filtro y el modal.
- **`useEffect`:** solicitar la lectura inicial de usuarios al montar la pantalla.
- **Renderizado condicional:** mostrar el formulario y el modal cuando corresponda.
- **`map` y `filter`:** presentar y filtrar arreglos de usuarios.
- **Inputs controlados:** vincular cada campo del formulario a un estado.
- **TypeScript:** definir datos esperados y detectar inconsistencias al programar.
- **React Router:** mostrar distintas páginas dentro de un layout compartido.

## 9. Pruebas manuales sugeridas

1. Iniciar el proyecto y abrir la página **Usuarios**.
2. Verificar la carga de los usuarios iniciales.
3. Buscar un usuario por nombre o apellido.
4. Filtrar por **VIP** o **regular**.
5. Registrar un usuario válido y verificar que aparece en la tabla.
6. Actualizar el navegador y comprobar que el registro permanece.
7. Intentar eliminar un usuario y seleccionar **Cancelar**: no debe borrarse.
8. Repetir y seleccionar **Sí, eliminar**: el registro debe desaparecer.
9. Comprobar el diseño en distintos tamaños de pantalla.

## 10. Limitaciones de esta fase

- Los datos están vinculados al **navegador y origen** donde se registraron.
- No se sincronizan entre equipos, navegadores o usuarios.
- Limpiar los datos del sitio puede eliminar los registros.
- `localStorage` no es apropiado para información sensible.
- La generación de identificadores es demostrativa; al conectarse al backend, el servidor debe encargarse de los IDs.

## 11. Próxima fase (no implementada)

La siguiente etapa será consumir la API de Spring Boot disponible en:

```text
http://localhost:8080/usuarios
```

Se incorporarán **Axios**, peticiones **GET** (y, cuando el backend las admita, **POST** y **DELETE**), operaciones asíncronas con `async/await`, indicadores de carga y manejo de errores. También será necesario revisar la configuración de **CORS** del backend.

El cambio se realizará principalmente en `usuarioService.ts` y en las funciones de la página que deban esperar respuestas del servidor. **Los componentes visuales podrán reutilizarse.**

---

**Estado del proyecto:** Fase 1 — aplicación local con `localStorage`, sin conexión a la API REST.
