let users = JSON.parse(localStorage.getItem("users")) || [];

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const cityInput = document.getElementById("city");
const userList = document.getElementById("userList");

document.getElementById("saveBtn").addEventListener("click", saveUser);
document.getElementById("clearBtn").addEventListener("click", clearAll);

function saveUser() {

    const name = nameInput.value.trim();
    const age = Number(ageInput.value);
    const city = cityInput.value.trim();

    if (!name || !city || age <= 0) {
        alert("Please enter valid information.");
        return;
    }

    const user = {
        name,
        age,
        city,
        timestamp: new Date().toLocaleString()
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    nameInput.value = "";
    ageInput.value = "";
    cityInput.value = "";

    displayUsers();
}

function displayUsers() {

    userList.innerHTML = "";

    if (users.length === 0) {
        userList.innerHTML =
            '<p class="empty">No users stored yet.</p>';
        return;
    }

    for (let i = 0; i < users.length; i++) {

        const user = users[i];

        const card = document.createElement("div");
        card.className = "user-card";

        card.innerHTML = `
            <div>
                <strong>Name:</strong> ${user.name}<br>
                <strong>Age:</strong> ${user.age}<br>
                <strong>City:</strong> ${user.city}<br>
                <small>Added: ${user.timestamp}</small>
            </div>

            <button class="delete-btn" onclick="deleteUser(${i})">
                Delete
            </button>
        `;

        userList.appendChild(card);
    }
}

function deleteUser(index) {

    users.splice(index, 1);

    localStorage.setItem("users", JSON.stringify(users));

    displayUsers();
}

function clearAll() {

    if (confirm("Are you sure you want to clear all users?")) {

        users = [];

        localStorage.removeItem("users");

        displayUsers();
    }
}

displayUsers();