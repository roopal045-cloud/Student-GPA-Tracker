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
    "Sem 1": [
      { subject: "Maths", credits: 4 },
      { subject: "Physics", credits: 3 }
    ],
    "Sem 1": [
      { subject: "Maths", credits: 4 },
      { subject: "Physics", credits: 3 }
    ],
    "Sem 1": [
      { subject: "Maths", credits: 4 },
      { subject: "Physics", credits: 3 }
    ]
  },

  POORNIMA: {
    "Sem 1": [
      { subject: "Maths", credits: 4 },
      { subject: "Programming", credits: 3 }
    ]
  }
};

function getGrade(m) {
  if (m >= 90) return ["O", 10];
  if (m >= 80) return ["A+", 9];
  if (m >= 70) return ["A", 8];
  if (m >= 60) return ["B+", 7];
  if (m >= 50) return ["B", 6];
  if (m >= 40) return ["C", 5];
  return ["F", 0];
}

let currentData = [];

const semSelect = document.getElementById("semSelect");
const schemeSelect = document.getElementById("schemeSelect");

schemeSelect.addEventListener("change", () => {
  const scheme = schemes[schemeSelect.value];

  semSelect.innerHTML = `<option value="">Select Semester</option>`;

  if (scheme) {
    Object.keys(scheme).forEach(sem => {
      semSelect.innerHTML += `<option value="${sem}">${sem}</option>`;
    });
  }
});

function loadData() {
  const scheme = schemeSelect.value;
  const sem = semSelect.value;

  if (!scheme || !sem) return;

  currentData = schemes[scheme][sem].map(s => ({
    ...s,
    marks: 0,
    grade: "-",
    points: 0
  }));

  renderOnce();
  calculateSGPA();
}

function renderOnce() {
  const body = document.getElementById("tableBody");
  body.innerHTML = "";

  currentData.forEach((row, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.subject}</td>
      <td>${row.credits}</td>
      <td><input type="number" min="0" max="100" value="0"></td>
      <td class="grade">-</td>
      <td class="points">0</td>
    `;

    const input = tr.querySelector("input");

    input.addEventListener("input", (e) => {
      updateRow(i, Number(e.target.value), tr);
    });

    body.appendChild(tr);
  });
}

function updateRow(i, marks, rowEl) {
  let [g, p] = getGrade(marks || 0);

  currentData[i].marks = marks;
  currentData[i].grade = g;
  currentData[i].points = p;

  rowEl.querySelector(".grade").innerText = g;
  rowEl.querySelector(".points").innerText = p;

  calculateSGPA();
}

function calculateSGPA() {
  let totalC = 0, totalP = 0;

  currentData.forEach(s => {
    totalC += s.credits;
    totalP += s.credits * s.points;
  });

  let sgpa = totalC ? (totalP / totalC) : 0;

  document.getElementById("sgpa").innerText = sgpa.toFixed(2);
  document.getElementById("cgpa").innerText = sgpa.toFixed(2);
}
