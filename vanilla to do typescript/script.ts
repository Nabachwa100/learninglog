// Define the structure of a Task
interface Task {
    id: number;
    text: string;
    completed: boolean;
}


// Get HTML elements
const taskInput = document.getElementById("taskInput") as HTMLInputElement;

const addButton = document.getElementById("addButton") as HTMLButtonElement;

const taskList = document.getElementById("taskList") as HTMLUListElement;


// Get saved tasks from localStorage
let tasks: Task[] = JSON.parse(
    localStorage.getItem("tasks") || "[]"
);


// Display tasks when the page loads
displayTasks();


// Add a task when the button is clicked
addButton.addEventListener("click", addTask);


// Add a task when Enter is pressed
taskInput.addEventListener("keypress", function(event: KeyboardEvent) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Function to add a task
function addTask(): void {

    const taskText: string = taskInput.value.trim();


    // Check for empty input
    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    // Create a new Task object
    const task: Task = {

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
function displayTasks(): void {

    // Clear the list
    taskList.innerHTML = "";


    tasks.forEach((task: Task) => {

        // Create list item
        const li: HTMLLIElement = document.createElement("li");

        li.classList.add("task");


        // Create task text
        const span: HTMLSpanElement = document.createElement("span");

        span.textContent = task.text;

        span.classList.add("task-text");


        // Check whether the task is completed
        if (task.completed) {

            span.classList.add("completed");

        }


        // Complete or uncomplete task
        span.addEventListener("click", () => {

            toggleTask(task.id);

        });


        // Create delete button
        const deleteButton: HTMLButtonElement =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-button");


        // Delete task
        deleteButton.addEventListener("click", () => {

            deleteTask(task.id);

        });


        // Add elements to the list item
        li.appendChild(span);

        li.appendChild(deleteButton);


        // Add list item to the page
        taskList.appendChild(li);

    });
}


// Function to complete/uncomplete a task
function toggleTask(id: number): void {

    tasks = tasks.map((task: Task): Task => {

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
function deleteTask(id: number): void {

    tasks = tasks.filter((task: Task): boolean => {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();
}


// Function to save tasks
function saveTasks(): void {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}