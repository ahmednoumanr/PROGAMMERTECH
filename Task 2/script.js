let tasks = [];

function addTask() {
    const taskInput = document.getElementById('newTask');
    const task = taskInput.value.trim();
    if (task !== '') {
        tasks.push({ text: task, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        const span = document.createElement('span');
        span.textContent = task.text;
        span.className = 'task-text';
        li.appendChild(span);
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'buttons';
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = () => editTask(index);
        buttonContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(buttonContainer);

        li.onclick = () => toggleComplete(index);
        taskList.appendChild(li);
    });
}


function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    const newTask = prompt('Edit task:', tasks[index].text);
    if (newTask !== null && newTask.trim() !== '') {
        tasks[index].text = newTask.trim();
        renderTasks();
    }
}

renderTasks();
