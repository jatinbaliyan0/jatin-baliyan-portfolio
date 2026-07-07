const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {

    if (inputBox.value === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.className = "delete";

    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = "";

    saveData();
}

listContainer.addEventListener("click", function(e){

    if(e.target.tagName === "LI"){

        e.target.classList.toggle("checked");
        saveData();

    }
    else if(e.target.tagName === "SPAN"){

        e.target.parentElement.remove();
        saveData();

    }

}, false);

function saveData(){

    localStorage.setItem("todo-data", listContainer.innerHTML);

}

function showTask(){

    listContainer.innerHTML = localStorage.getItem("todo-data") || "";

}

showTask();