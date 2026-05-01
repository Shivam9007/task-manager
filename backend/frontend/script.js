const API = "http://localhost:7000/api";

// ================= AUTH =================

async function register() {
  const name = prompt("Enter name");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.message || "Registered");
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
}

// ================= DASHBOARD =================

async function loadDashboard() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const tasks = await res.json();

  document.getElementById("total").innerText = tasks.length;
}

// ================= PROJECT =================

async function createProject() {
  const name = document.getElementById("pname").value;
  const token = localStorage.getItem("token");

  await fetch(`${API}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });

  alert("Project created");
}

// ================= TASK =================

async function createTask() {
  const title = document.getElementById("title").value;
  const token = localStorage.getItem("token");

  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title })
  });

  alert("Task created");
}