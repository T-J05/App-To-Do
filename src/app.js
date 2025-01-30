
import { createElement, render, createStore } from '../frame.js'; 
console.log(createStore, "haso")

const reducer = (state = { todos: [] }, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] };
        default:
            return state;
    }
};

const store = createStore(reducer);

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
