document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});

document.getElementById('filters').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        filterTasks(event.target.dataset.filter);
    }
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({ text: li.querySelector('.task-text').textContent, completed: li.classList.contains('completed') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    createTaskElement(taskText, false);
    taskInput.value = '';
    saveTasks();
}

function createTaskElement(taskText, completed) {
    const taskItem = document.createElement('li');
    if (completed) {
        taskItem.classList.add('completed');
    }
    taskItem.innerHTML = `
        <span class="task-text" ondblclick="editTask(this)">${taskText}</span>
        <div>
            <button class="edit" onclick="editTask(this)">✏️</button>
            <button class="delete" onclick="removeTask(this)">🗑️</button>
            <button class="toggle" onclick="toggleTask(this)">✔️</button>
        </div>
    `;

    document.getElementById('task-list').appendChild(taskItem);
}

function removeTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
    saveTasks();
}

function toggleTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.classList.toggle('completed');
    saveTasks();
}

function editTask(element) {
    const taskText = element.tagName === 'SPAN' ? element : element.parentElement.parentElement.querySelector('.task-text');
    const currentText = taskText.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.addEventListener('blur', function() {
        taskText.textContent = input.value.trim();
        input.replaceWith(taskText);
        saveTasks();
    });
    taskText.replaceWith(input);
    input.focus();
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll('#task-list li');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = '';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? '' : 'none';
                break;
            case 'pending':
                task.style.display = task.classList.contains('completed') ? 'none' : '';
                break;
        }
    });
}

