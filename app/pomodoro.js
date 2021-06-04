export default function pomodoro() {
    const $ = document.querySelector.bind(document);

    const startBtn = $('#startBtn');
    const pauseBtn = $('#pauseBtn');
    const resetBtn = $('#resetBtn');
    const timer = $('.app__coutdown');
    const tempInput = $('#tempInput');
    const sessionInput = $('#sessionInput');

    let coutdownInterval;
    let coutdown;
    let minutes = 25;
    let seconds = 0;

    // Default temp:
    timer.innerText = '25:00';

    // Event Listeners:
    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    resetBtn.addEventListener('click', reset);
    tempInput.addEventListener('change', getTemp);

    // Functions
    function start() {
        startBtn.classList.add('app_btn--hide');
        pauseBtn.classList.remove('app_btn--hide');
        clearInterval(coutdown);
        
        coutdown = setInterval(() => {
            seconds--;
            if(seconds <= 0) {
                if(minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    clearInterval(coutdown);
                    // Ativar o intervalo, avançar nas sessões e fazer o pop-up.
                }
            }
        
            timer.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds  : seconds}`;
        }, 1000);
    }

    function pause() {
        pauseBtn.classList.add('app_btn--hide');
        startBtn.classList.remove('app_btn--hide');

        clearInterval(coutdown);
    }

    function reset(){
        minutes = 25;
        seconds = 0;
    
        timer.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds  : seconds}`;
    }

    function getTemp() {
        const convertTemp = Number(tempInput.value);
        
        if(convertTemp >= 5 && convertTemp <= 120) {
            minutes = convertTemp;
            timer.innerText = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds  : seconds}`;
        } else {
            reset();
            
            /\D+/.test(tempInput.value)
            ? invalidInput('Não é permitido inserir caracteres neste campo')
            : invalidInput('O tempo deve ter no mínimo 5 minutos e no máximo 120 minutos');
        }
    }

    // Helpers:
    function invalidInput(message) {
        const invalidInput = $('.invalidInputs');

        invalidInput.innerText = message;
        invalidInput.classList.add('invalidInputs--active');
        setTimeout(() => invalidInput.classList.remove('invalidInputs--active'), 6000);
    }

}