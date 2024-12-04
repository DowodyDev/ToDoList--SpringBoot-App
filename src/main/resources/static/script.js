document.addEventListener('DOMContentLoaded', function() {
    // Fetch all tasks from the API and display them
    loadTasks();

    // Handle form submission to add a new task
    document.getElementById('taskForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from refreshing the page

        const taskTitle = document.getElementById('taskTitle').value;
        const taskDescription = document.getElementById('taskDescription').value;

        // Send POST request to create a new task
        fetch('http://localhost:5500/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: taskTitle,
                description: taskDescription,
                completed: false,
            }),
        })
        .then(response => response.json())
        .then(task => {
            loadTasks(); // Reload tasks after adding a new one
            document.getElementById('taskForm').reset(); // Reset the form
        })
        .catch(error => console.error('Error creating task:', error));
    });
});

// Function to load tasks and display them in the UI
function loadTasks() {
    fetch('http://localhost:5500/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = ''; // Clear the list before adding new tasks

            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.innerHTML = `
                    <div>
                        <strong>${task.title}</strong><br>
                        ${task.description}
                    </div>
                    <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                `;
                taskList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Error loading tasks:', error));
}

// Function to delete a task
function deleteTask(taskId) {
    fetch(`http://localhost:5500/api/tasks/${taskId}`, {
        method: 'DELETE',
    })
    .then(() => loadTasks()) // Reload tasks after deletion
    .catch(error => console.error('Error deleting task:', error));
}