document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `${taskText} <button onclick="removeTask(this)">X</button>`;

    document.getElementById('task-list').appendChild(taskItem);

    taskInput.value = '';
});

function removeTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}
