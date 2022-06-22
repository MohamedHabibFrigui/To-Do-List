const tasksBox = document.querySelector(".tasks-box"),
      addBtn = document.querySelector(".plus"),
      input = document.querySelector("input"),
      select = document.querySelector("select"),
      completeAllBtn = document.querySelector(".complete-all"),
      deleteAllBtn = document.querySelector(".delete-all"),
      errorMsg = document.querySelector(".error");


let arrayOfTasks = getData();

window.onload = function() {
    input.focus();
}
if(!arrayOfTasks || arrayOfTasks.length === 0) {
    arrayOfTasks = [];
    addNoTasks();
} else {
    arrayOfTasks.forEach(element => {
        var mainSpan = document.createElement("span");
        mainSpan.classList.add("task");
        if(element.status)
            mainSpan.classList.add("completed");
        var check = document.createElement("i");
        check.setAttribute("class", "fa-solid");
        check.classList.add("fa-check");
        check.addEventListener("click", completeUncomplete);
        var trash = document.createElement("i");
        trash.setAttribute("class", "fa-solid");
        trash.classList.add("fa-trash");
        trash.addEventListener("click", deleteTask);
        mainSpan.appendChild(document.createTextNode(element.name));
        mainSpan.appendChild(check);
        mainSpan.appendChild(trash);
        tasksBox.appendChild(mainSpan)
    });
}

let countTasks = arrayOfTasks.length;

addBtn.onclick = addTask;

input.onkeyup = function(e) {
    if(e.key === "Enter")
        addTask();
}


select.onclick = function(e) {
    const taskSpans = document.querySelectorAll(".task");
    taskSpans.forEach(span => {
        switch(e.target.value) {
            case "all" : 
                span.style.display = "block";
            break;
            case "completed" :
                if(span.classList.contains("completed"))
                    span.style.display = "block";
                else
                    span.style.display = "none";
            break;
            case "uncompleted" :
                if(span.classList.contains("completed"))
                    span.style.display = "none";
                else
                    span.style.display = "block";
            break;
    }});
}

completeAllBtn.onclick = function() {
    const taskSpans = document.querySelectorAll(".task");
    taskSpans.forEach(span => {
        span.classList.add("completed");

        arrayOfTasks = getData();
        for(let i = 0; i < arrayOfTasks.length; i++)
            arrayOfTasks[i].status = true;
        setData(arrayOfTasks);
    });
}

deleteAllBtn.onclick = function() {
    tasksBox.innerHTML = "";
    arrayOfTasks = [];
    setData(arrayOfTasks);
    countTasks = 0;
    addNoTasks();
}



function addNoTasks() {
        var noTasksSpan = document.createElement("span");
        noTasksSpan.setAttribute("class", "no-tasks-message");
        noTasksSpan.appendChild(document.createTextNode("No Tasks To Show"));
        tasksBox.appendChild(noTasksSpan);
}

function addTask() {
    if(input.value.trim())
        if(!existingTask(input.value.trim())) {
            //el5ouza3balat mta3 local storage
            var taskInfo = {
                name: input.value.trim(),
                id: Date.now(),
                status: false
            }
            arrayOfTasks.push(taskInfo);
            setData(arrayOfTasks);

            var mainSpan = document.createElement("span");
            mainSpan.classList.add("task");
            var check = document.createElement("i");
            check.setAttribute("class", "fa-solid");
            check.classList.add("fa-check");
            check.addEventListener("click", completeUncomplete);
            var trash = document.createElement("i");
            trash.setAttribute("class", "fa-solid");
            trash.classList.add("fa-trash");
            trash.addEventListener("click", deleteTask);
            mainSpan.appendChild(document.createTextNode(input.value.trim()))
            mainSpan.appendChild(check);
            mainSpan.appendChild(trash);
            tasksBox.appendChild(mainSpan)

            input.value = "";
            input.focus();
            const noTasksMsg = document.querySelector(".no-tasks-message");
            if(noTasksMsg)
                noTasksMsg.remove();

            countTasks++;
    } else {
        errorMsg.classList.add("active");
        setTimeout(() => {
            errorMsg.classList.remove("active");
            errorMsg.classList.add("after");
        }, 1000);
        setTimeout(() => {
            errorMsg.classList.remove("after");
        }, 1500);
    }
        // mahich mregla 100%, feha mochkla ki tenzel 3la ba34ou
}

function completeUncomplete(e) {
    e.target.parentElement.classList.toggle("completed");

    arrayOfTasks = getData();
    for(let i = 0; i < arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].name === e.target.parentElement.innerText) {
            if(arrayOfTasks[i].status)
                arrayOfTasks[i].status = false;
            else
                arrayOfTasks[i].status = true;
        }
    }
    setData(arrayOfTasks);
}

function deleteTask(e) {
    // el5ouza3balat mta3 local storage
    arrayOfTasks = arrayOfTasks.filter((elem) => {
        return elem.name !== e.target.parentElement.innerText;
    });
    setData(arrayOfTasks);

    e.target.parentElement.classList.add("deleted");
    
    setTimeout(() => {
    e.target.parentElement.remove();
    }, 200);

    countTasks--;

    if(countTasks === 0)
        setTimeout(addNoTasks, 200);
}

function getData() {
    return JSON.parse(window.localStorage.getItem("tasks"));
}
function setData(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function existingTask(value) {
    for(let i = 0; i < arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].name === value)
            return true;
    }
    return false;
}