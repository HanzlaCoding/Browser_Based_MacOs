const time = document.querySelector(".time");
const dateCont = document.querySelector(".dateCont");
const accInput = document.getElementById("password");
const accInputBtn = document.querySelector(".account button");
const errorModal = document.querySelector("#wrong-password");

accInputBtn.addEventListener("click", (e) => {
    if (accInput.value == "1234") {
        window.location.href = "/src/Pages/Desktop.html"
    }
    else {
        errorModal.style.display = "block";
    }
})

const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

var monthsOfYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

setInterval(() => {
    getUpdatesDate()
}, 1000);

function getUpdatesDate() {
    const date = new Date();
    const currDate = date.getDate()
    const currDay = daysOfWeek[date.getDay()]
    const currMonth = monthsOfYear[date.getMonth()]
    const currHrs = date.getHours()
    const currMint = date.getMinutes()
    const currSecs = date.getSeconds()

    time.innerHTML = `<h1 class="text-8xl font-semibold">
        ${currHrs < 10 ? `0${currHrs}` : `${currHrs}`}:${currMint < 10 ? `0${currMint}` : `${currMint}`}:${currSecs < 10 ? `0${currSecs}` : `${currSecs}`}
            </h1>`;

    dateCont.innerHTML = `<h4 class="text-2xl leading-4 text-zinc-300">
        ${currDay + " "}${currMonth + " "}${currDate}</h4>`;
}