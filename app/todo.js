export default function todo() {
    const $ = document.querySelector.bind(document);

    // Variables:
    const list = $('.todo-list__list');
    const form = $('.todo-list__form');
    const inputTodo = $('.todo-list__input');

    // Validation LocalStorage datas:
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    // Event Listeners:
    document.addEventListener('DOMContentLoaded', getTodos());
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        saveLocalTodos(inputTodo.value);
        list.innerHTML = null;
        getTodos();
        inputTodo.value = '';
        inputTodo.focus();
    });

    // Helpers:
    function saveLocalTodos(todo) {
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function getTodos() {
        todos.forEach((item) => {
            list.innerHTML += `
            <div class="todo-list__list-item">
                <li class="todo-list__list-item">${item}</li>

                <button class="todo-list__btn-check"></button><!--todo-list__btn-check-->
                <button class="todo-list__btn-trash"></button><!--todo-list__btn-trash-->
            </div><!--todo-list__list-item-->
            `;
        });
        
        const btnDelete = document.querySelectorAll('.todo-list__btn-trash');
        btnDelete.forEach(btn => btn.addEventListener('click', deleteCheck));
    }

    function deleteCheck(e) {
        const itemTodo = e.target.parentElement;

        if(e.target.classList[0] == 'todo-list__btn-trash'){
            itemTodo.classList.add('todo-list__list-item--deleted');
            removeLocalStorage(itemTodo);
            itemTodo.addEventListener('transitionend', () => itemTodo.remove()); 
        }
    }

    function removeLocalStorage(todo) {
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}