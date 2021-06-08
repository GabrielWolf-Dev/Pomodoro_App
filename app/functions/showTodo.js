export default function showTodo() {
    const $ = document.querySelector.bind(document);
    const todo = $('.todo-list');
    const btnOpen = $('.app__btn');
    const btnClose = $('.todo-list__btn-close');
    const bg = $('.bg-black');

    btnOpen.addEventListener('click', () => {
        todo.classList.add('todo-list--active');
        bg.classList.add('bg-black--active');
        btnClose.ariaExpanded = true;
    });

    btnClose.addEventListener('click', closeMenu);
    bg.addEventListener('click', closeMenu);

    function closeMenu() {
        todo.classList.remove('todo-list--active');
        bg.classList.remove('bg-black--active');
        btnClose.ariaExpanded = false;       
    }
}