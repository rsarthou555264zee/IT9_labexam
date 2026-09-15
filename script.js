const STORAGE_KEY = 'studentTasks';

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function updateSummary() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.done).length;
  const pending = total - completed;

  document.getElementById('total').textContent = total;
  document.getElementById('pending').textContent = pending;
  document.getElementById('completed').textContent = completed;
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  if (!taskList) return;

  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<tr><td colspan="5" class="text-center">No tasks yet.</td></tr>';
    updateSummary();
    return;
  }

  tasks.forEach((task, index) => {
    const row = `
      <tr>
        <td>${task.title}</td>
        <td>${task.dueDate || 'No date'}</td>
        <td>${task.priority}</td>
        <td>${task.done ? 'Completed' : 'Pending'}</td>
        <td>
          <button class="btn btn-sm ${task.done ? 'btn-warning' : 'btn-success'} me-2" onclick="toggleTask(${index})">
            ${task.done ? 'Undo' : 'Done'}
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
        </td>
      </tr>
    `;

    taskList.innerHTML += row;
  });

  updateSummary();
}

function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;

  if (!title) {
    alert('Please enter a task title.');
    return;
  }

  tasks.push({
    title: title,
    dueDate: dueDate,
    priority: priority,
    done: false
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  document.getElementById('taskTitle').value = '';
  document.getElementById('dueDate').value = '';
  document.getElementById('priority').value = 'Low';

  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  renderTasks();
}

function clearAll() {
  if (confirm('Clear all tasks?')) {
    tasks = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    renderTasks();
  }
}

window.addTask = addTask;
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
window.clearAll = clearAll;

document.addEventListener('DOMContentLoaded', renderTasks);