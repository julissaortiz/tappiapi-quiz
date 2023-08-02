const initialsEl = document.getElementById("initials");
const scoreEl = document.getElementById("score");

let score = localStorage.getItem("High-Score");
let initials = localStorage.getItem("Initials");

initialsEl.textContent = JSON.parse(initials);
scoreEl.textContent = score;
