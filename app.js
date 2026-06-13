const schemes = {
  RTU: {
    "Sem 1": [
      { subject: "Maths I", credits: 4 },
      { subject: "Physics", credits: 3 },
      { subject: "Maths I", credits: 4 },
      { subject: "Physics", credits: 3 },
      { subject: "Maths I", credits: 4 },
      { subject: "Physics", credits: 3 }
    ],
    "Sem 2": [
      { subject: "Maths II", credits: 4 },
      { subject: "Chemistry", credits: 3 }
    ],
     "Sem 3": [
      { subject: "Maths II", credits: 4 },
      { subject: "Chemistry", credits: 3 }
    ],
    "Sem 4": [
      { subject: "Maths II", credits: 4 },
      { subject: "Chemistry", credits: 3 }
    ]
  },

  SKIT: {
    "Sem 1": [
      { subject: "Engineering Mathematics-I ", credits: 4 },
       { subject: "Engineering Physics/Engineering Chemistry ", credits: 4 },
       { subject: "Communication Skills/Universal Human Values ", credits: 2 },
       { subject: "Computational Thinking and Programming", credits: 2 },
       { subject: "Basic Electrical & Electronics Engineering /Basic Mechanical Engineering/Basic Civil Engineering", credits: 2 },
       { subject: "Engineering Physics Lab/ Engineering Chemistry Lab ", credits: 1 },
      { subject: "Language Lab/ Universal Human Values Lab ", credits: 1 },
        { subject: "C Programming Lab", credits: 1 },
        { subject: "Basic Electrical & Electronics Engineering Lab/Basic Civil Engineering Lab/Manufacturing Practice Workshop ", credits: 3 },
        { subject: "Computer Aided Engineering Graphics/Computer Aided Machine Drawing ", credits: 1 },
       { subject: "Social Outreach, Discipline and Extra-Curricular Activities (SODECA) ", credits: 0.5 },
       { subject: "Audit Course", credits: 0 }
    ],
    "Sem 2": [
      { subject: "Engineering Mathematics-II ", credits: 4 },
       { subject: "Engineering Physics/Engineering Chemistry ", credits: 4 },
        { subject: "Innovation & Entrepreneurship ", credits: 1},
       { subject: "Communication Skills/Universal Human Values ", credits: 2 },
       { subject: "Problem Solving using Object Oriented Paradigm", credits: 2 },
       { subject: "Basic Electrical & Electronics Engineering /Basic Mechanical Engineering/Basic Civil Engineering", credits: 2 },
       { subject: "Engineering Physics Lab/ Engineering Chemistry Lab ", credits: 1 },
      { subject: "Language Lab/ Universal Human Values Lab ", credits: 1 },
        { subject: "C Programming Lab", credits: 1 },
        { subject: "Basic Electrical & Electronics Engineering Lab/Basic Civil Engineering Lab/Manufacturing Practice Workshop ", credits: 3 },
        { subject: "Computer Aided Engineering Graphics/Computer Aided Machine Drawing ", credits: 1 },
       { subject: "Social Outreach, Discipline and Extra-Curricular Activities (SODECA) ", credits: 0.5 },
       { subject: "Audit Course", credits: 0 }
    ],
    "Sem 3": [
      { subject: "Engineering Mathematics-II ", credits: 4 },
       { subject: "Engineering Physics/Engineering Chemistry ", credits: 4 },
        { subject: "Innovation & Entrepreneurship ", credits: 1},
       { subject: "Communication Skills/Universal Human Values ", credits: 2 },
       { subject: "Problem Solving using Object Oriented Paradigm", credits: 2 },
       { subject: "Basic Electrical & Electronics Engineering /Basic Mechanical Engineering/Basic Civil Engineering", credits: 2 },
       { subject: "Engineering Physics Lab/ Engineering Chemistry Lab ", credits: 1 },
      { subject: "Language Lab/ Universal Human Values Lab ", credits: 1 },
        { subject: "C Programming Lab", credits: 1 },
        { subject: "Basic Electrical & Electronics Engineering Lab/Basic Civil Engineering Lab/Manufacturing Practice Workshop ", credits: 3 },
        { subject: "Computer Aided Engineering Graphics/Computer Aided Machine Drawing ", credits: 1 },
       { subject: "Social Outreach, Discipline and Extra-Curricular Activities (SODECA) ", credits: 0.5 },
       { subject: "Audit Course", credits: 0 }
    ],
    "Sem 4": [
      { subject: "Maths", credits: 4 },
      { subject: "Physics", credits: 3 }
    ]
  },

  POORNIMA: {
    "Sem 1": [
      { subject: "Maths", credits: 4 },
      { subject: "Programming", credits: 3 }
    ],
    "Sem 2": [
      { subject: "Maths", credits: 4 },
      { subject: "Physics", credits: 3 }
    ],
    "Sem 3": [
      { subject: "Maths", credits: 4 },
      { subject: "Physics", credits: 3 }
    ],
    "Sem 4": [
      { subject: "Maths", credits: 4 },
      { subject: "Physics", credits: 3 }
    ]
  }
};
let currentData = [];
let cgpaSemesterCount = 1;

const semSelect = document.getElementById("semSelect");
const schemeSelect = document.getElementById("schemeSelect");

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

  semSelect.innerHTML =
    `<option value="">Select Semester</option>`;

  const selected = schemeSelect.value;

  if (selected === "CUSTOM") {

    document
      .getElementById("customControls")
      .classList.remove("hidden");

    semSelect.disabled = true;

    return;
  }

  document
    .getElementById("customControls")
    .classList.add("hidden");

  semSelect.disabled = false;

  const scheme = schemes[selected];

  if (scheme) {

    Object.keys(scheme).forEach(sem => {

      semSelect.innerHTML +=
        `<option value="${sem}">${sem}</option>`;
    });
  }
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

  const sem = semSelect.value;

  if (!sem) return;

  currentData = schemes[scheme][sem].map(item => ({
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
