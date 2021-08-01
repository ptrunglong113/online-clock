document.addEventListener('DOMContentLoaded', function() {

    setInterval(() => {
        updateCurrentTime();

        //
    }, 1000);
});

function updateCurrentTime() {
    let the_time = new Date();



    document.getElementById('clock').innerHTML = `${the_time.getHours()}:${the_time.getMinutes()}:${the_time.getSeconds()}`;
    document.getElementById('date').innerHTML = `ngày ${the_time.getDate()}, tháng ${parseInt(the_time.getMonth()) + 1}, năm ${the_time.getFullYear()}`;
}
