const addTask = document.getElementById('addTaskTextbox');
const resetTaskButton = document.getElementById('resetButton');
const taskPlaceholder = document.getElementById('taskPlaceholder');
const completedTasksContainer = document.getElementById('completedTasksContainer');
const addTaskTextbox = document.getElementById('addTaskTextbox');


const tasks = [];
let taskId = 0;

addTask.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTaskTextbox.placeholder = "enter task";
        taskPlaceholder.style.display = 'none';

        const taskInput = addTask.value;
        if (taskInput.trim() === '') return;  // Prevent adding empty tasks

        const task = document.createElement('label');
        const taskCheckbox = document.createElement('input');
        taskCheckbox.setAttribute('type', 'checkbox');

        task.textContent = " - " + taskInput;

        const taskList = document.getElementById('taskList');
        const taskWrapper = document.createElement('div'); // Wrapper for each task

        taskWrapper.appendChild(taskCheckbox);  
        taskWrapper.appendChild(task);          

        taskList.appendChild(taskWrapper);

        addTask.value = ''; 

        tasks.push(taskId);
        taskId++;
    }
});

resetTaskButton.addEventListener('click', function() {
    removeAllTasks();

    enterDateTextbox.style.display = 'inline-block';
    addTaskTextbox.style.display = 'none';

    const dateDiv = document.getElementById('date');
    dateDiv.textContent = "e.g. 'xxxx-xx-xx'";

    completedTasksContainer.style.display = 'none';
    taskList.style.display = 'inline';

    addTaskTextbox.placeholder = "enter task";
});

function removeAllTasks() {
    tasks.length = 0;  // Clear the tasks array
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';  // Remove all task elements from the task list container
}

function removeWhenAllChecked() {
    const taskAmount = tasks.length; 
    const checkedCheckboxAmount = document.querySelectorAll('input[type="checkbox"]:checked').length;
    if (taskAmount === checkedCheckboxAmount) {
        removeAllTasks();
    }
}

enterDateTextbox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const dateInput = enterDateTextbox.value;
        const dateDiv = document.getElementById('date');

        dateDiv.textContent = dateInput; // Set the text content of the p element

        enterDateTextbox.value = ''; 

        // Remove the date input and display the task input
        enterDateTextbox.style.display = 'none';
        addTaskTextbox.style.display = 'inline-block';
        addTaskTextbox.focus();
    }
});


function allChecked() {
    const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
    const checkboxArray = Array.from(checkboxes);
    const allChecked = checkboxArray.every(checkbox => checkbox.checked);

    if (checkboxArray.length > 0) {
        if (allChecked) {
            taskList.style.display = 'none';
            completedTasksContainer.style.display = 'inline';
            addTaskTextbox.placeholder = "enter more tasks";
        } else {
            taskList.style.display = 'inline';
            completedTasksContainer.style.display = 'none';
        }
    }
}

setInterval(allChecked, 500); // Run the allChecked function every 500 milliseconds



