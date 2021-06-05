export default function pomodoro() {
    const $ = document.querySelector.bind(document);

    const startBtn = $('#startBtn');
    const pauseBtn = $('#pauseBtn');
    const resetBtn = $('#resetBtn');
    const timer = $('.app__coutdown');
    const tempInput = $('#tempInput');
    const sessionInput = $('#sessionInput');
    const currentSession = $('#session');
    const notificationSound = $('.notification-sound');

    let coutdownInterval;
    let coutdown;
    let minutes = Number(tempInput.value);
    let seconds = 0;
    let sessions = 1;
    

    // Default temp:
    timer.textContent = '25:00';
    currentSession.textContent = 1;

    // Event Listeners:
    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    resetBtn.addEventListener('click', reset);
    tempInput.addEventListener('change', getTemp);
    sessionInput.addEventListener('change', getSession);

    // Functions
    function start() {
        let contentNotification = `Iniciando o intervalo da sessão ${sessions}.`;
        startBtn.classList.add('app_btn--hide');
        pauseBtn.classList.remove('app_btn--hide');
        clearInterval(coutdown);
        clearInterval(coutdownInterval);
        
        coutdown = setInterval(() => {
            seconds--;
            if(seconds <= 0) {
                if(minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    clearInterval(coutdown);
                    minutes = Number(tempInput.value);
                    notificationSound.play();
                    notification(contentNotification);
                    startInterval();
                }
            }
        
            timer.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }, 10);
    }

    function startInterval() {
        let minutesInterval = 5;
        let secondsInterval = 0;
        let contentNotification = `Finalizando o intervalo da sessão ${sessions}.`;
    
        coutdownInterval = setInterval(() => {
            timer.textContent = `${minutesInterval < 10 ? '0' + minutesInterval : minutesInterval}:${secondsInterval < 10 ? '0' + secondsInterval  : secondsInterval}`;
            
            secondsInterval--;
                if(secondsInterval <= 0) {
                    if(minutesInterval > 0) {
                        minutesInterval--;
                        secondsInterval = 59;
                    }else if(sessions < Number(sessionInput.value)){
                        sessions++;
                        currentSession.textContent = sessions;
                        start();
                        notification(contentNotification);
                    } else {
                        pause();
                        reset();
                    }
                    
                }
        }, 10);
    }

    function pause() {
        pauseBtn.classList.add('app_btn--hide');
        startBtn.classList.remove('app_btn--hide');

        clearInterval(coutdown);
        clearInterval(coutdownInterval);
    }

    function reset() {
        minutes = Number(tempInput.value);
        seconds = 0;
        sessions = 1;
    
        timer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds  : seconds}`;
        currentSession.textContent = 1;
        clearInterval(coutdownInterval);
    }

    function getTemp() {
        const convertTemp = Number(tempInput.value);

        if(convertTemp >= 5 && convertTemp <= 120) {
            minutes = convertTemp;
            timer.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds  : seconds}`;
        } else {
            tempInput.value = 25;

            /\D+/.test(tempInput.value)
            ? invalidInput('Não é permitido inserir caracteres neste campo')
            : invalidInput('O tempo deve ter no mínimo 5 minutos e no máximo 120 minutos');
        }
    }

    function getSession() {
        if(Number(sessionInput.value) <= 0 || /\D+\S+/.test(sessionInput.value)) {
            sessionInput.value = 1;
            invalidInput('Não é permitido inserir caracteres neste campo e deve-se conter 1 sessão');
        } else {
            correctInput(`Adição de ${sessionInput.value} ${sessionInput.value == 1 ? 'sessão' : 'sessões'} com sucesso!`);
        }
    }

    // Helpers:
    function invalidInput(message) {
        const invalidInput = $('.invalidInputs');

        invalidInput.textContent = message;
        invalidInput.classList.add('invalidInputs--active');
        setTimeout(() => invalidInput.classList.remove('invalidInputs--active'), 6000);
    }

    function correctInput(message) {
        const correctInput = $('.correctInputs');

        correctInput.textContent = message;
        correctInput.classList.add('correctInputs--active');
        setTimeout(() => correctInput.classList.remove('correctInputs--active'), 6000);
    }

    function notification(content){
        if(Notification.permission === 'granted') {
            new Notification('Pomodoro App', {
                body: content,
                icon: '../favicon.ico',
                lang: 'pt-BR',
                vibrate: [200, 100, 200],
            });
        }
    }

}