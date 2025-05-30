// Global variable to track edit mode
let editIndex = -1;

// Page references
const signupPage = document.getElementById("signupPage");
const loginPage = document.getElementById("loginPage");
const forgotUsernamePage = document.getElementById("forgotUsernamePage");
const forgotPasswordPage = document.getElementById("forgotPasswordPage");
const recordPage = document.getElementById("recordPage");

// Navigation functions
function showLogin() {
  hideAll();
  loginPage.classList.remove("hidden");
}
function showSignup() {
  hideAll();
  signupPage.classList.remove("hidden");
}
function showForgotUsername() {
  hideAll();
  forgotUsernamePage.classList.remove("hidden");
}
function showForgotPassword() {
  hideAll();
  forgotPasswordPage.classList.remove("hidden");
}
function showRecordPage() {
  hideAll();
  recordPage.classList.remove("hidden");
  loadPatients();
}
function hideAll() {
  signupPage.classList.add("hidden");
  loginPage.classList.add("hidden");
  forgotUsernamePage.classList.add("hidden");
  forgotPasswordPage.classList.add("hidden");
  recordPage.classList.add("hidden");
}

// Signup
function signupUser(e) {
  e.preventDefault();
  const user = {
    username: document.getElementById("signupUsername").value,
    password: document.getElementById("signupPassword").value,
    email: document.getElementById("signupEmail").value,
    phone: document.getElementById("signupPhone").value
  };
  localStorage.setItem("doctor", JSON.stringify(user));
  alert("Signup successful! Please login.");
  showLogin();
}

// Login
function loginUser(e) {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("doctor"));
  const u = document.getElementById("loginUsername").value;
  const p = document.getElementById("loginPassword").value;
  if (user && u === user.username && p === user.password) {
    showRecordPage();
  } else {
    alert("Invalid username or password!");
  }
}

// Forgot Username
function recoverUsername(e) {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("doctor"));
  const email = document.getElementById("recoverUsernameEmail").value;
  if (user && email === user.email) {
    alert("Your username is: " + user.username);
  } else {
    alert("Email not found!");
  }
}

// Forgot Password
function recoverPassword(e) {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("doctor"));
  const phone = document.getElementById("recoverPhone").value;
  if (user && phone === user.phone) {
    alert("Your password is: " + user.password);
  } else {
    alert("Phone number not matched!");
  }
}

// Save patient record (Add or Update)
function savePatient(e) {
  e.preventDefault();

  const patient = {
    name: document.getElementById("pname").value,
    phone: document.getElementById("pphone").value,
    address: document.getElementById("paddress").value,
    gender: document.getElementById("pgender").value,
    age: document.getElementById("page").value,
    fee: document.getElementById("pfee").value,
    treatment: document.getElementById("ptreatment").value,
    time: new Date().toLocaleString()
  };

  let allPatients = JSON.parse(localStorage.getItem("patients")) || [];

  if (editIndex === -1) {
    // Add new patient
    allPatients.push(patient);
    alert("Record added!");
  } else {
    // Update existing patient
    allPatients[editIndex] = patient;
    alert("Record updated!");
    editIndex = -1; // Reset edit mode
  }

  localStorage.setItem("patients", JSON.stringify(allPatients));
  e.target.reset();
  loadPatients();
}

// Load patients to table
function loadPatients() {
  const allPatients = JSON.parse(localStorage.getItem("patients")) || [];
  const tbody = document.getElementById("recordTableBody");
  tbody.innerHTML = "";
  allPatients.forEach((p, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${p.name}</td>
        <td>${p.phone}</td>
        <td>${p.address}</td>
        <td>${p.gender}</td>
        <td>${p.age}</td>
        <td>${p.fee}</td>
        <td>${p.treatment}</td>
        <td>${p.time}</td>
        <td>
          <button class="edit-btn" onclick="editPatient(${index})">Edit</button>
          <button class="delete-btn" onclick="deletePatient(${index})">Delete</button>
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

// Edit patient record
function editPatient(index) {
  const allPatients = JSON.parse(localStorage.getItem("patients")) || [];
  const patient = allPatients[index];

  document.getElementById("pname").value = patient.name;
  document.getElementById("pphone").value = patient.phone;
  document.getElementById("paddress").value = patient.address;
  document.getElementById("pgender").value = patient.gender;
  document.getElementById("page").value = patient.age;
  document.getElementById("pfee").value = patient.fee;
  document.getElementById("ptreatment").value = patient.treatment;

  editIndex = index;
}

// Delete patient record
function deletePatient(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    let allPatients = JSON.parse(localStorage.getItem("patients")) || [];
    allPatients.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(allPatients));
    loadPatients();
  }
}
function searchTable() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const table = document.querySelector("table");
  const tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) { // i=1 to skip header row
    const row = tr[i];
    const text = row.textContent.toLowerCase();
    if (text.indexOf(filter) > -1) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}

