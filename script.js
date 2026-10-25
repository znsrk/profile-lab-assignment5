// Part 1: one object with a string, number, boolean, and array.
const userProfile = {
  name: "Zhanserik Zharylgassyn",
  birthYear: 2007, // Sample birth year; change it using the form.
  isDeveloper: true,
  hobbies: ["Coding", "Music", "Football"]
};

const currentYear = new Date().getFullYear();
const profileForm = document.querySelector("#profile-form");
const usernameInput = document.querySelector("#username");
const birthYearInput = document.querySelector("#birth-year");
const profileMessage = document.querySelector("#profile-message");
const hobbyForm = document.querySelector("#hobby-form");
const hobbyInput = document.querySelector("#hobby-input");
const hobbyList = document.querySelector("#hobby-list");
const hobbyMessage = document.querySelector("#hobby-message");
const removeButton = document.querySelector("#remove-item");

birthYearInput.max = currentYear;

// Calculate the age and update the visible profile using textContent.
function displayProfile() {
  const age = currentYear - userProfile.birthYear;
  const months = age * 12;
  const initials = userProfile.name.split(/\s+/).slice(0, 2).map(word => word[0]).join("");

  document.querySelector("#profile-heading").textContent = userProfile.name;
  document.querySelector("#avatar").textContent = initials.toUpperCase();
  document.querySelector("#profile-description").textContent =
    `Born in ${userProfile.birthYear} · ${userProfile.isDeveloper ? "Developer" : "Not a developer"}`;
  document.querySelector("#age").textContent = age;
  document.querySelector("#months").textContent = months;
  document.querySelector("#hobby-count").textContent = userProfile.hobbies.length;
  document.querySelector("#calculation").textContent =
    `${currentYear} − ${userProfile.birthYear} = ${age} years · ${age} × 12 = ${months} months`;
}

// Part 2: handle the form without reloading the page.
profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = usernameInput.value.trim();
  const birthYear = Number(birthYearInput.value);

  if (!name || !Number.isInteger(birthYear) || birthYear < 1900 || birthYear > currentYear) {
    profileMessage.textContent = `Enter a name and a birth year from 1900 to ${currentYear}.`;
    return;
  }

  userProfile.name = name;
  userProfile.birthYear = birthYear;
  displayProfile();
  profileMessage.textContent = "Profile updated. Looking good!";
});

// Part 3: create list elements from the hobbies array.
function displayHobbies() {
  hobbyList.replaceChildren();

  userProfile.hobbies.forEach(function (hobby) {
    const item = document.createElement("li");
    item.textContent = hobby;
    hobbyList.appendChild(item);
  });

  removeButton.disabled = userProfile.hobbies.length === 0;
  document.querySelector("#empty-state").hidden = userProfile.hobbies.length !== 0;
  document.querySelector("#list-count").textContent =
    `${String(userProfile.hobbies.length).padStart(2, "0")} ITEMS`;
  displayProfile();
}

hobbyForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const hobby = hobbyInput.value.trim();

  if (!hobby) {
    hobbyMessage.textContent = "Enter a hobby before adding it.";
    return;
  }

  userProfile.hobbies.push(hobby);
  displayHobbies();
  hobbyInput.value = "";
  hobbyMessage.textContent = `Added ${hobby}.`;
  hobbyInput.focus();
});

removeButton.addEventListener("click", function () {
  const removedHobby = userProfile.hobbies.pop();
  displayHobbies();
  hobbyMessage.textContent = `Removed ${removedHobby}.`;
});

// Display the starting data when the page loads.
displayHobbies();
