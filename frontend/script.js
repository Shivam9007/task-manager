const API = "http://127.0.0.1:8000/api";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
});

// ================= AUTH =================

async function registerUser() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    if (!name || !email || !password) return alert("Please fill in all fields");
    try {
        const res = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.user.name);
            alert(data.message);
            window.location.href = "dashboard.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Could not connect to server. Is it running?");
    }
}

async function loginUser() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    if (!email || !password) return alert("Please fill in all fields");
    try {
        const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.user.name);
            window.location.href = "dashboard.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Could not connect to server. Is it running?");
    }
}

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.href = "index.html";
}

// ================= TASKS =================

let allTasks = [];
let currentFilter = "all";

async function loadTasks() {
    try {
        const res = await fetch(`${API}/tasks`, { headers: getHeaders() });
        allTasks = await res.json();
        renderTasks();
        updateStats();
    } catch (err) {
        console.error("Load Tasks Error:", err);
    }
}

async function addTask() {
    const titleEl = document.getElementById("taskTitle");
    const title = titleEl.value.trim();
    if (!title) return alert("Enter a task title");
    try {
        await fetch(`${API}/tasks`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ title })
        });
        titleEl.value = "";
        loadTasks();
    } catch (err) {
        console.error("Add Task Error:", err);
    }
}

async function updateTask(id, status) {
    try {
        await fetch(`${API}/tasks/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({ status })
        });
        loadTasks();
    } catch (err) {
        console.error("Update Error:", err);
    }
}

async function deleteTask(id) {
    if (!confirm("Delete this task?")) return;
    try {
        await fetch(`${API}/tasks/${id}`, {
            method: "DELETE",
            headers: getHeaders()
        });
        loadTasks();
    } catch (err) {
        console.error("Delete Error:", err);
    }
}

function setFilter(filter, btn) {
    currentFilter = filter;
    document.querySelectorAll(".filter-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    if (!list) return;
    const filtered = currentFilter === "all"
        ? allTasks
        : allTasks.filter(t => t.status === currentFilter);

    if (!filtered.length) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🎉</div>
                <p>${currentFilter === "Completed" ? "No completed tasks yet." : "Nothing here — add a task above!"}</p>
            </div>`;
        return;
    }

    list.innerHTML = "";
    filtered.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";
        const dotClass = task.status === "Completed" ? "dot-completed"
            : task.status === "In Progress" ? "dot-progress" : "dot-pending";
        const titleClass = task.status === "Completed" ? "done" : "";
        li.innerHTML = `
            <div class="task-dot ${dotClass}"></div>
            <span class="task-title ${titleClass}">${task.title}</span>
            <select class="task-status-select" onchange="updateTask('${task._id}', this.value)">
                <option value="Pending" ${task.status === "Pending" ? "selected" : ""}>⏳ Pending</option>
                <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>🔥 In Progress</option>
                <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>✅ Done</option>
            </select>
            <button class="delete-btn" onclick="deleteTask('${task._id}')">🗑</button>
        `;
        list.appendChild(li);
    });
}

function updateStats() {
    const total = allTasks.length;
    const done = allTasks.filter(t => t.status === "Completed").length;
    const inProgress = allTasks.filter(t => t.status === "In Progress").length;
    const pending = allTasks.filter(t => t.status === "Pending").length;
    const pct = total ? Math.round((done / total) * 100) : 0;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setW = (id, val) => { const el = document.getElementById(id); if (el) el.style.width = val; };

    set("stat-total", total);
    set("stat-pending", inProgress);
    set("stat-done", done);
    set("progress-pct", pct + "%");
    setW("progress-fill", pct + "%");

    const max = Math.max(total, 1);
    setW("sb-pending", (pending / max * 100) + "%");
    setW("sb-progress", (inProgress / max * 100) + "%");
    setW("sb-done", (done / max * 100) + "%");
    set("sb-pending-n", pending);
    set("sb-progress-n", inProgress);
    set("sb-done-n", done);
}