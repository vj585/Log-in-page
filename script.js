const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const error = document.getElementById("signupError");

    error.textContent = "";

    if (password.length < 6){
      error.textContent = "Password must be at least 6 characters.";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(user => user.email === email);

    if(exists){
      error.textContent ="Email already exists.";
    } else {
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account created successfully!");
      window.location.href = "index.html";
    }
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const error = document.getElementById("loginError");

    error.textContent = "";

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "success.html";
    } else {
      error.textContent = "Invalid email or password.";
    }
  });
}

const currentPage = window.location.pathname;
if (currentPage.endsWith("success.html")) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.setItem("isLoggedIn", "false");
  window.location.href = "index.html";
}
