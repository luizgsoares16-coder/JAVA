const apiUrl = 'http://localhost:3000/task';

const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value;
})

const title = document.getElementById
const description = document.getElementById

('description')
.value;

try {
    const res = await fetch(apiUrl, {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ title, description })
    });

    if (!res.ok) throw new Error('Erro ao adicionar tarefa');

    const task = await res.json();
    form.reset();
    
    addTaskToUl(task);


} catch (err) {
    alert('Erro ao salvar tarefa: ' + err.message)
}

function addTaskToUl(task) {
    const li = document.createElement('li');
    li.className = task.completed ? "completed" : "";

    const description = task.description ? task.description.trim() : "";

    const text = description ? `${task.title} - ${task.description}` : task.title;
    
    li.innerHTML  = `

    <span>${text}</span>
    <div>
        <button onclick='toggleComplete(${task.id}, ${taskList.completed})'>✔️</button>
        <button onclick='deleteTask(${task.id})'>🗑️</button>
    </div>
    `;
    taskList.appendChild(li);
};

async function loadTasks() {
    try {
        const res = await fetch(apiUrl);

        if (!res.ok) throw new Error("Erro ao carregar tarefas");

        const tasks = await res.json();

        taskList.innerHTML = "";
        tasks.forEach(addTaskToUl);

    } catch (error) {
        alert("Erro ao carregar tarefas" + err.message);
    }
};

async function toggleComplete(id, completed) {
    try {
        const res = await fetch(`${apiUrl}/${id}`);
        const task = await res.json();

        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                completed: !completed
            })
        });
        loadTasks();

    } catch (err) {
        alert('Erro ao atualizar tarefa: ' + err.message);
    }
};

async function deleteTask(id) {
    try{
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'

        });

        loadTasks();

    } catch (err) {
        alert('Erro ao excluir tarefa: ' + err.message);
    }
}
