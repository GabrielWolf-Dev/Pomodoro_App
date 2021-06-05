export default function todo() {
    const $ = document.querySelector.bind(document);
    const $all = document.querySelectorAll.bind(document);

    // Variables:
    const list = $('.todo-list__list');
    const form = $('.todo-list__form');
    const inputTodo = $('.todo-list__input');
    const filterOption = $('.todo-list__select');

    // Validation LocalStorage datas:
    let todos = localStorage.getItem('todos') === null ? [] : JSON.parse(localStorage.getItem('todos'));
    
    // EventListeners:
    document.addEventListener('DOMContentLoaded', getTodo());
    filterOption.addEventListener('click', filterTodo);
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        makeTodos();
        btnListeners();

        saveLocalTodos(inputTodo.value);
        inputTodo.value = '';
        inputTodo.focus();
    });

    // Create Todo Item:
    function makeTodos() {
        list.innerHTML += `
            <div class="todo-list__list-item">
                <li class="todo-list__list-text">${inputTodo.value}</li>
                <button class="todo-list__btn-check"></button><!--todo-list__btn-check-->
                <button class="todo-list__btn-trash"></button><!--todo-list__btn-trash-->
            </div><!--todo-list__list-item-->
        `;
    }

    // Helpers:
    function getTodo() {
        todos.forEach(todoText => {
            list.innerHTML += `
                <div class="todo-list__list-item">
                    <li class="todo-list__list-text">${todoText}</li>
                    <button class="todo-list__btn-check"></button><!--todo-list__btn-check-->
                    <button class="todo-list__btn-trash"></button><!--todo-list__btn-trash-->
                </div><!--todo-list__list-item-->
            `;
        });
        btnListeners();
    }

    function btnListeners() {
        $all('.todo-list__btn-trash').forEach(btn => btn.addEventListener('click', deleteTodo));
        $all('.todo-list__btn-check').forEach(btn => btn.addEventListener('click', check));
    }

    function check(e){
        const itemTodo = e.target.parentElement;

        itemTodo.classList.toggle('todo-list__list-item--completed');
    }

    function deleteTodo(e) {
        const itemTodo = e.target.parentElement;

        itemTodo.classList.add('todo-list__list-item--deleted');
        removeLocalStorage(itemTodo);
        itemTodo.addEventListener('transitionend', () => itemTodo.remove()); 
    }

    function saveLocalTodos(todo) {
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function removeLocalStorage(todo) {
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Filter Todo:
    function filterTodo(e) {
        const todosList = Array.from($('.todo-list__list').children);
        
        todosList.forEach(todo => {
            switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
                case "completed":
                    todo.classList.contains('todo-list__list-item--completed') 
                    ? todo.style.display = 'flex'
                    : todo.style.display = 'none';
                    break;
                    case "uncompleted":
                        !todo.classList.contains('todo-list__list-item--completed')
                        ? todo.style.display = 'flex'
                        : todo.style.display = 'none';
                        break;
            }
        });
    }
}