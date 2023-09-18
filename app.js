// app.js
document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const deleteButton = document.getElementById("deleteButton");
    const taskList = document.getElementById("taskList");

    addButton.addEventListener("click", addTask);
    deleteButton.addEventListener("click", deleteTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const listItem = document.createElement("li");
            listItem.textContent = taskText;
            listItem.addEventListener("click", selectTask); // Add the event listener to new tasks to select them as well
            taskList.appendChild(listItem);
            taskInput.value = "";
            saveTasks();
        }
    }

    function deleteTask() {
        const selectedTask = taskList.querySelector("li.selected");
        if (selectedTask) {
            taskList.removeChild(selectedTask);
            saveTasks();
        } else {
            alert("Bitte eine Aufgabe auswählen!");
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach((task) => {
            tasks.push(task.textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((taskText) => {
            const listItem = document.createElement("li");
            listItem.textContent = taskText;
            listItem.addEventListener("click", selectTask);
            taskList.appendChild(listItem);
        });
    }

    function selectTask(event) {
        taskList.querySelectorAll("li").forEach((task) => {
            task.classList.remove("selected");
        });
        event.target.classList.add("selected");
    }

    loadTasks();
});
