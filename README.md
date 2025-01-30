# App-Todo utilizando Framework-i

## Descripción
Esta es una aplicación de lista de tareas (To-Do) construida utilizando `Framework-i`, un pequeño framework basado en una arquitectura de estado y renderizado similar a React.

La aplicación permite agregar tareas a una lista y mantener el estado actualizado utilizando un store centralizado.

## Instalación
Asegúrate de tener un entorno donde puedas ejecutar código JavaScript moderno y un servidor local si lo necesitas.

1. Clona este repositorio o descarga los archivos.
2. Asegúrate de que `frame.js` está correctamente importado en tu proyecto.
3. Ejecuta la aplicación en un navegador con soporte para ES6.

## Código de Ejemplo

### Importar las funciones del framework
Se importan las funciones necesarias desde `frame.js` para manejar la creación de elementos, el renderizado y el estado global.

```js
import { createElement, render, createStore } from '../frame.js';
```

### Definir el Reducer y Crear el Store
El reducer es la función encargada de administrar las acciones y el estado actual de la aplicación. Aquí, gestionamos la acción `ADD_TODO` para agregar nuevas tareas a la lista.

```js
const reducer = (state = { todos: [] }, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] };
        default:
            return state;
    }
};
const store = createStore(reducer);
```

### Renderizar la Aplicación
La función `renderApp` obtiene el estado actual de la aplicación y crea dinámicamente los elementos de la interfaz usando `createElement`. Luego, se usa `render` para actualizar el DOM.

```js
const renderApp = () => {
    const state = store.getState();

    const app = createElement(
        'div',
        null,
        createElement('h1', null, 'Lista de Tareas'),
        createElement(
            'ul',
            null,
            ...state.todos.map(todo => createElement('li', null, todo))
        ),
        createElement(
            'input',
            { id: "input-todo", placeholder: "Escribe una tarea" }
        ),
        createElement(
            'button',
            {
                onclick: () => {
                    const task = document.getElementById("input-todo");
                    if (task && task.value) {
                        store.dispatch({ type: 'ADD_TODO', payload: task.value });
                        task.value = '';
                    }
                }
            },
            'Agregar Tarea'
        )
    );

    render(app, document.getElementById('root'));
};

store.subscribe(renderApp);
renderApp();
```

## Explicación del Código
1. **Se obtiene el estado actual** con `store.getState()`.
2. **Se construyen los elementos** de la interfaz con `createElement`.
3. **Se renderiza la aplicación** en el elemento con id `root`.
4. **Se suscribe `renderApp` a los cambios de estado** para que la UI se actualice automáticamente.
5. **Se maneja el evento `onclick` del botón** para capturar la entrada del usuario y actualizar la lista de tareas.

## Contribución
Si deseas contribuir, puedes hacer un fork del repositorio, realizar cambios y enviar un pull request.

## Licencia
Este proyecto se encuentra bajo la licencia MIT.

