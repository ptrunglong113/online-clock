let audio;
let clockInterval;


function start() {
    disableViews();

    let selected_hours = document.querySelector('#sl-hours').value;
    let selected_minutes = document.querySelector('#sl-minutes').value;

    clockInterval = setInterval(() => {
        let the_time = new Date();

        selected_hours = selected_hours < the_time.getHours() ? (23 + parseInt(selected_hours)): selected_hours;
        selected_minutes = selected_minutes < the_time.getMinutes() ? (59 + parseInt(selected_minutes)) : selected_minutes;

        console.log(selected_hours, selected_minutes);

        const remaining_hours = `${selected_hours - the_time.getHours()}`;
        const remaining_minutes = `${selected_minutes - 1 - the_time.getMinutes()}`;
        const remaining_seconds = `${59 - the_time.getSeconds()}`;

        document.getElementById('timer-remaining-text').innerHTML = `${remaining_hours}:${remaining_minutes}:${remaining_seconds}`;


        if (remaining_hours == 0 && remaining_minutes == 0 && remaining_seconds == 0) {
            complete();
        }
    }, 1000);


    document.getElementById('start').classList.add('d-none');
    document.getElementById('stop').classList.remove('d-none');
}

function stop() {
    clearInterval(clockInterval);
    document.getElementById('timer-remaining-text').innerHTML = '';

    document.getElementById('stop').classList.add('d-none');
    document.getElementById('start').classList.remove('d-none');

    stopAudio();
    enableViews();
}

function complete() {
    clearInterval(clockInterval);
    playAudio();
    document.getElementById('snooze').removeAttribute('disabled');
}

function continueSleep() {
    stopAudio();
    disableViews();
    
    const selectedMinutes = document.getElementById('alarm-snooze-minutes').value;
    let remaining_minutes = selectedMinutes - 1;
    let remaining_seconds = 59;


    clockInterval = setInterval(() => {
        document.getElementById('timer-remaining-text').innerHTML = `${remaining_minutes}:${remaining_seconds}`;


        if (remaining_minutes == 0 && remaining_seconds == 0) {
            complete();
        }
        
        if (remaining_seconds == 0) {
            remaining_seconds = 59;
            --remaining_minutes;
        }

        --remaining_seconds;
    }, 1000);


    document.getElementById('start').classList.add('d-none');
    document.getElementById('stop').classList.remove('d-none');
}


function disableViews() {
    document.getElementById('sl-hours').setAttribute('disabled', 'disabled');
    document.getElementById('sl-minutes').setAttribute('disabled', 'disabled');
    document.getElementById('sl-audio').setAttribute('disabled', 'disabled');

    document.getElementById('test_start').setAttribute('style', 'pointer-events: none;');
    document.getElementById('test_stop').setAttribute('style', 'pointer-events: none;');
    document.getElementById('alarm-snooze-minutes').setAttribute('disabled', 'disabled');

    document.getElementById('snooze').setAttribute('disabled', 'disabled');
}
function enableViews() {
    document.getElementById('sl-hours').removeAttribute('disabled');
    document.getElementById('sl-minutes').removeAttribute('disabled');
    document.getElementById('sl-audio').removeAttribute('disabled');

    document.getElementById('test_start').removeAttribute('style');
    document.getElementById('test_stop').removeAttribute('style');
    document.getElementById('alarm-snooze-minutes').removeAttribute('disabled');

    document.getElementById('snooze').setAttribute('disabled', 'disabled');
}



function playAudio() {
    const selectedAudioUrl = document.getElementById('sl-audio').value;

    audio = new Audio(selectedAudioUrl);
    audio.play();
    audio.loop = true;
}

function stopAudio() {
    if (audio && !audio.paused)
        audio.pause();
}
