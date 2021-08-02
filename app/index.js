import menuMobile from './functions/menuMobile.js';
import smoothScroll from './functions/smoothScroll.js';
import showTodo from './functions/showTodo.js';
import todo from './todo.js';
import pomodoro from './pomodoro.js';
import '../css/style.css';

window.onload = () => {
    menuMobile();
    smoothScroll();
    showTodo();
    todo();
    pomodoro();

    if(!window.Notification){
        alert("Este browser não suporta notificações de Desktop");
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission()
        .then(permission => {
          if(permission === "granted") {
            console.log("Permissão para notificações: " + permission)
          }  
        });
    }
}
