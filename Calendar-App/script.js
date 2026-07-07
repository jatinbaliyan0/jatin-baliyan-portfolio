const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Local Storage Events
let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};

let currentDate = new Date();

function renderCalendar() {

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    monthYear.textContent = `${months[month]} ${year}`;

    daysContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Empty boxes
    for(let i = 0; i < firstDay; i++){
        const empty = document.createElement("div");
        daysContainer.appendChild(empty);
    }

    const today = new Date();

    for(let day = 1; day <= lastDate; day++){

        const dateBox = document.createElement("div");
        dateBox.textContent = day;

        const key = `${year}-${month}-${day}`;

        if(events[key]){
            dateBox.innerHTML = `${day}<br><small>📌</small>`;
            dateBox.title = events[key];
        }

        if(
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ){
            dateBox.classList.add("today");
        }

        dateBox.addEventListener("click", ()=>{

            let eventName = prompt("Enter Event", events[key] || "");

            if(eventName === null) return;

            if(eventName.trim() === ""){

                delete events[key];
                localStorage.setItem("calendarEvents", JSON.stringify(events));

            }else{

                events[key] = eventName;
                localStorage.setItem("calendarEvents", JSON.stringify(events));

            }

            renderCalendar();

        });

        daysContainer.appendChild(dateBox);
    }
}

prevBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

nextBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

renderCalendar();