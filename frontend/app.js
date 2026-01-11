const API = "http://localhost:3000/api/v1";

/* ================= AUTH ================= */

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const isAdmin = document.getElementById("isAdmin").checked;
  const message = document.getElementById("message");

  message.innerText = "";

  try {
    // Login request
    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      message.innerText = data.message || "Login failed";
      return;
    }

    // Save JWT
    localStorage.setItem("token", data.accessToken);

    // Get current user info (role check)
    const userRes = await fetch(`${API}/users/current`, {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    const user = await userRes.json();

    // Admin login intent
    if (isAdmin) {
      if (user.role !== "admin") {
        localStorage.removeItem("token");
        message.innerText = "This account is not an admin.";
        return;
      }
      window.location.href = "admin.html";
    } else {
      window.location.href = "dashboard.html";
    }
  } catch (err) {
    message.innerText = "Something went wrong";
  }
}

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const isAdmin = document.getElementById("isAdmin").checked;
  const message = document.getElementById("message");

  message.innerText = "";

  // ❌ Block admin signup at frontend
  if (isAdmin) {
    message.innerText = "Admin accounts cannot be created via signup.";
    return;
  }

  try {
    const res = await fetch(`${API}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email.split("@")[0],
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      message.innerText = data.message || "Signup failed";
      return;
    }

    message.innerText = "Signup successful. Please login.";
  } catch (err) {
    message.innerText = "Something went wrong";
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

/* ================= MEMOS (USER) ================= */

async function createMemo() {
  const content = document.getElementById("memoContent").value;
  const token = localStorage.getItem("token");

  if (!content) return;

  await fetch(`${API}/memos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  document.getElementById("memoContent").value = "";
  loadMemos();
}

async function loadMemos() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  const res = await fetch(`${API}/memos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const memos = await res.json();
  const list = document.getElementById("memoList");
  list.innerHTML = "";

  memos.forEach((memo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${memo.content}
      <button onclick="deleteMemo('${memo._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function deleteMemo(id) {
  const token = localStorage.getItem("token");

  await fetch(`${API}/memos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  loadMemos();
}

/* ================= ADMIN ================= */

async function loadUsers() {
  const token = localStorage.getItem("token");
  const list = document.getElementById("adminList");
  list.innerHTML = "";

  const res = await fetch(`${API}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    list.innerHTML = "<li>Access denied</li>";
    return;
  }

  const users = await res.json();

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.username} (${user.email}) - ${user.role}`;
    list.appendChild(li);
  });
}

async function loadAllMemos() {
  const token = localStorage.getItem("token");
  const list = document.getElementById("adminList");
  list.innerHTML = "";

  const res = await fetch(`${API}/admin/memos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    list.innerHTML = "<li>Access denied</li>";
    return;
  }

  const memos = await res.json();

  memos.forEach((memo) => {
    const li = document.createElement("li");

    const username =
      memo.user_id && memo.user_id.username
        ? memo.user_id.username
        : "Unknown User";

    li.textContent = `${memo.content} (by ${username})`;
    list.appendChild(li);
  });
}


/* ================= AUTO LOAD ================= */

if (window.location.pathname.includes("dashboard")) {
  loadMemos();
}
