export default function todo() {
    const $ = document.querySelector.bind(document);

    const list = $('.todo-list__list');
    const form = $('.todo-list__form');
    const inputTodo = $('.todo-list__input');

    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    

    document.addEventListener('DOMContentLoaded', getTodos());
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveLocalTodos(inputTodo.value);

        list.innerHTML = null;
        getTodos();
    });

    function saveLocalTodos(todo) {
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function getTodos() {
        todos.forEach((item) => {
            list.innerHTML += `
            <div class="todo-list__list-item">
                <li class="todo-list__list-item">${item}</li>

                <button  class="todo-list__btn-check">
                    <i class="fas fa-check"></i>
                </button><!--todo-list__btn-check-->
                <button id="teste" class="todo-list__btn-trash">
                    <i class="fas fa-trash"></i>
                </button><!--todo-list__btn-trash-->
            </div><!--todo-list__list-item-->
            `;
        });
    }
}