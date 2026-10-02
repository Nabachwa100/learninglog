// Get elements from the HTML
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Get saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display tasks when the page loads
displayTasks();


// Add a new task
addTaskButton.addEventListener("click", addTask);


// Allow the user to press Enter to add a task
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Function to add a task
function addTask() {

    const taskText = taskInput.value.trim();

    // Do not add an empty task
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add task to the array
    tasks.push(task);

    // Save tasks
    saveTasks();

    // Display tasks
    displayTasks();

    // Clear input
    taskInput.value = "";
}


// Function to display tasks
function displayTasks() {

    // Clear the current list
    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        // Create list item
        const li = document.createElement("li");

        li.classList.add("task");

        // Create task text
        const span = document.createElement("span");

        span.textContent = task.text;

        span.classList.add("task-text");

        // If task is completed
        if (task.completed) {
            span.classList.add("completed");
        }

        // Complete/uncomplete task
        span.addEventListener("click", function() {

            toggleTask(task.id);

        });


        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-button");


        // Delete task
        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        // Add elements to list item
        li.appendChild(span);

        li.appendChild(deleteButton);

        // Add list item to the page
        taskList.appendChild(li);

    });
}


// Function to complete/uncomplete a task
function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });

    saveTasks();

    displayTasks();
}


// Function to delete a task
function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    saveTasks();

    displayTasks();
}


// Function to save tasks to localStorage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}