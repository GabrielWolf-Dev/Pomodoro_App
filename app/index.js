import menuMobile from './functions/menuMobile.js';
import smoothScroll from './functions/smoothScroll.js';
import showTodo from './functions/showTodo.js';
import todo from './todo.js';
import pomodoro from './pomodoro.js';

window.onload = () => {
    menuMobile();
    smoothScroll();
    showTodo();
    todo();
    pomodoro();
}