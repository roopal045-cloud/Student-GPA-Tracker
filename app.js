const schemes = {
  RTU: {
    CSE: {
       "Sem 1": [
      { subject: "Maths I", credits: 4 },
      { subject: "Physics", credits: 3 },
      { subject: "Maths I", credits: 4 },
      { subject: "Physics", credits: 3 },
      { subject: "Maths I", credits: 4 },
      { subject: "Physics", credits: 3 }
    ],
      "Sem 2": [{subject: "Physics", credit:4}],
      "Sem 3": [{subject: "OOPS", credit:4}],
      "Sem 4": [{subject: "Chemistry", credit:4}]
    },

    AI: {
      "Sem 1": [{subject: "Mathematics", credit:4}],
      "Sem 2": [{subject: "Mathematics", credit:4}],
      "Sem 3": [{subject: "Mathematics", credit:4}]
    }
  },

  SKIT: {
    CSE: {
      "Sem 1": [{subject: "Mathematics", credit:4}],
      "Sem 2": [{subject: "Mathematics", credit:4}]
    }
  },

  POORNIMA: {},

  LMNIT: {}
};

let currentData = [];
let cgpaSemesterCount = 1;

const semSelect = document.getElementById("semSelect");
const schemeSelect = document.getElementById("schemeSelect");
const branchSelect = document.getElementById("branchSelect");
function getGrade(marks) {

  if (marks >= 90) return ["O", 10];
  if (marks >= 80) return ["A+", 9];
  if (marks >= 70) return ["A", 8];
  if (marks >= 60) return ["B+", 7];
  if (marks >= 50) return ["B", 6];
  if (marks >= 40) return ["C", 5];

  return ["F", 0];
}

schemeSelect.addEventListener("change", () => {

  const college = schemeSelect.value;

  branchSelect.innerHTML =
    `<option value="">Select Department</option>`;

  semSelect.innerHTML =
    `<option value="">Select Semester</option>`;

  if (college === "CUSTOM") {

    document
      .getElementById("customControls")
      .classList.remove("hidden");

    branchSelect.style.display = "none";
    semSelect.style.display = "none";

    return;
  }

  document
    .getElementById("customControls")
    .classList.add("hidden");

  branchSelect.style.display = "block";
  semSelect.style.display = "block";

  if (!schemes[college]) return;

  Object.keys(schemes[college]).forEach(branch => {

    branchSelect.innerHTML += `
      <option value="${branch}">
        ${branch}
      </option>
    `;
  });

});
branchSelect.addEventListener("change", () => {

  const college = schemeSelect.value;
  const branch = branchSelect.value;

  semSelect.innerHTML =
    `<option value="">Select Semester</option>`;

  if (!college || !branch) return;

  Object.keys(
    schemes[college][branch]
  ).forEach(sem => {

    semSelect.innerHTML += `
      <option value="${sem}">
        ${sem}
      </option>
    `;
  });

});
function loadData() {

  const scheme = schemeSelect.value;

  if (!scheme) return;

  if (scheme === "CUSTOM") {

    currentData = [];

    document.getElementById("tableBody").innerHTML = "";

    addCustomSubject();

    calculateSGPA();

    return;
  }

  const branch = branchSelect.value;
const sem = semSelect.value;

if (!branch || !sem) {
  alert("Please select department and semester");
  return;
}

currentData =
  schemes[scheme][branch][sem].map(item => ({
    ...item,
    marks: 0,
    grade: "-",
    points: 0
  }));

  renderPresetTable();

  calculateSGPA();
}

function renderPresetTable() {

  const body =
    document.getElementById("tableBody");

  body.innerHTML = "";

  currentData.forEach((row, index) => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.subject}</td>
      <td>${row.credits}</td>

      <td>
        <input
          type="number"
          min="0"
          max="100"
          value="${row.marks}">
      </td>

      <td class="grade">
        ${row.grade}
      </td>

      <td class="points">
        ${row.points}
      </td>

      <td>—</td>
    `;

    tr.querySelector("input")
      .addEventListener("input", e => {

      updatePresetRow(
        index,
        Number(e.target.value),
        tr
      );

    });

    body.appendChild(tr);
  });
}

function updatePresetRow(index, marks, rowEl) {

  const [grade, points] =
    getGrade(marks);

  currentData[index].marks = marks;
  currentData[index].grade = grade;
  currentData[index].points = points;

  rowEl.querySelector(".grade")
    .innerText = grade;

  rowEl.querySelector(".points")
    .innerText = points;

  calculateSGPA();
}
function addCustomSubject() {

  currentData.push({
    subject: "",
    credits: 0,
    marks: 0,
    grade: "-",
    points: 0
  });

  renderCustomTable();
}

function deleteCustomSubject(index) {

  currentData.splice(index, 1);

  renderCustomTable();

  calculateSGPA();
}

function renderCustomTable() {

  const body =
    document.getElementById("tableBody");

  body.innerHTML = "";

  currentData.forEach((row, index) => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <input
          type="text"
          value="${row.subject}"
          placeholder="Subject">
      </td>

      <td>
        <input
          type="number"
          min="0"
          value="${row.credits}">
      </td>

      <td>
        <input
          type="number"
          min="0"
          max="100"
          value="${row.marks}">
      </td>

      <td class="grade">
        ${row.grade}
      </td>

      <td class="points">
        ${row.points}
      </td>

      <td>
        <button
          onclick="deleteCustomSubject(${index})">
          ❌
        </button>
      </td>
    `;

    const inputs =
      tr.querySelectorAll("input");

    inputs[0].addEventListener("input", e => {

      currentData[index].subject =
        e.target.value;
    });

    inputs[1].addEventListener("input", e => {

      currentData[index].credits =
        Number(e.target.value);

      calculateSGPA();
    });

    inputs[2].addEventListener("input", e => {

      const marks =
        Number(e.target.value);

      const [grade, points] =
        getGrade(marks);

      currentData[index].marks = marks;
      currentData[index].grade = grade;
      currentData[index].points = points;

      tr.querySelector(".grade")
        .innerText = grade;

      tr.querySelector(".points")
        .innerText = points;

      calculateSGPA();
    });

    body.appendChild(tr);
  });
}

function calculateSGPAValue() {

  let totalCredits = 0;
  let totalPoints = 0;

  currentData.forEach(item => {

    totalCredits +=
      Number(item.credits);

    totalPoints +=
      Number(item.credits) *
      item.points;
  });

  if (!totalCredits) return 0;

  return totalPoints / totalCredits;
}

function calculateSGPA() {

  const sgpa =
    calculateSGPAValue();

  document.getElementById("sgpa")
    .innerText = sgpa.toFixed(2);

  document.getElementById("sgpaCard")
    .innerText = sgpa.toFixed(2);

  let credits = 0;

  currentData.forEach(item => {
    credits += Number(item.credits);
  });

  document.getElementById("creditsCard")
    .innerText = credits;

  let grade = "-";

  if (sgpa >= 9) grade = "O";
  else if (sgpa >= 8) grade = "A+";
  else if (sgpa >= 7) grade = "A";
  else if (sgpa >= 6) grade = "B+";
  else if (sgpa >= 5) grade = "B";

  document.getElementById("gradeCard")
    .innerText = grade;
}

function openCGPACalculator() {

  document.getElementById("cgpaModal")
    .classList.remove("hidden");

  document.getElementById("sgpaInputs")
    .innerHTML = `
      <div class="sgpa-row">
        <label>Semester 1</label>
        <input
          type="number"
          step="0.01"
          class="cgpaInput">
      </div>
    `;

  cgpaSemesterCount = 1;
}

function closeCGPACalculator() {

  document.getElementById("cgpaModal")
    .classList.add("hidden");
}

function addSGPAInput() {

  cgpaSemesterCount++;

  document.getElementById("sgpaInputs")
    .insertAdjacentHTML(
      "beforeend",
      `
      <div class="sgpa-row">
        <label>
          Semester ${cgpaSemesterCount}
        </label>

        <input
          type="number"
          step="0.01"
          class="cgpaInput">
      </div>
      `
    );
}

function calculateCGPAFromInput() {

  const inputs =
    document.querySelectorAll(".cgpaInput");

  let total = 0;
  let count = 0;

  inputs.forEach(input => {

    const value =
      Number(input.value);

    if (value > 0) {

      total += value;
      count++;
    }
  });

  const cgpa =
    count ? total / count : 0;

  document.getElementById("cgpa")
    .innerText = cgpa.toFixed(2);

  document.getElementById("cgpaResult")
    .innerText =
      `CGPA: ${cgpa.toFixed(2)}`;
}
