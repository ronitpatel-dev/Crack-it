let photoBase64 = "";

document.getElementById('photo').addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function addEducation() {
  const container = document.getElementById('educationFields');
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.placeholder = 'Education';
  newInput.classList.add('education-input');
  container.appendChild(newInput);
}

document.getElementById('resumeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const skills = document.getElementById('skills').value;
  const experience = document.getElementById('experience').value;
  const project = document.getElementById('project').value;
  const theme = document.getElementById('theme').value;

  const educationInputs = document.querySelectorAll('.education-input');
  let educationList = "";
  educationInputs.forEach(input => {
    if (input.value.trim() !== "") {
      educationList += `<li>${input.value}</li>`;
    }
  });

  const photoHTML = photoBase64
    ? `<img src="${photoBase64}" class="profile-photo">`
    : '';

  const projectHTML = project.trim()
    ? `<p><strong>Project:</strong> <a href="${project}" target="_blank">${project}</a></p>`
    : '';

  const htmlContent = `
    ${photoHTML}
    <h2>${name}</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Education:</strong></p>
    <ul>${educationList}</ul>
    <p><strong>Skills:</strong> ${skills}</p>
    <p><strong>Experience:</strong> ${experience}</p>
    ${projectHTML}
  `;

  const resumeContainer = document.getElementById('resumeContent');
  resumeContainer.innerHTML = htmlContent;
  resumeContainer.className = theme;

  document.getElementById('resumeOutput').style.display = 'block';
});

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.html(document.getElementById('resumeContent'), {
    callback: function (doc) {
      doc.save("resume.pdf");
    },
    x: 10,
    y: 10
  });
}

function printResume() {
  window.print();
}

function closeResume() {
  document.getElementById('resumeOutput').style.display = 'none';
  document.getElementById('resumeForm').scrollIntoView({ behavior: 'smooth' });
}

function goBack() {
  // window.location.href = "home.html";
  history.back();
}
