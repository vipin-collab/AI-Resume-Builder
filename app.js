/* ===== ELEMENT REFERENCES ===== */
const nameInput = document.getElementById("name");
const roleInput = document.getElementById("role");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const skillsInput = document.getElementById("skills");
const projectsInput = document.getElementById("projects");
const educationInput = document.getElementById("education");
const experienceInput = document.getElementById("experience");
const certificationInput = document.getElementById("certification");

const outName = document.getElementById("out-name");
const outRole = document.getElementById("out-role");
const outEmail = document.getElementById("out-email");
const outPhone = document.getElementById("out-phone");
const outSkills = document.getElementById("out-skills");
const outProjects = document.getElementById("out-projects");
const outEducation = document.getElementById("out-education");
const outExperience = document.getElementById("out-experience");
const outCertification = document.getElementById("out-certification");

const steps = document.querySelectorAll(".step");
const panels = document.querySelectorAll(".panel");
const themeSelect = document.getElementById("themeSelect");
const templateSelect = document.getElementById("templateSelect");
const resumeTemplate = document.getElementById("resumeTemplate");
const aiSkills = document.getElementById("aiSkills");
const aiProjects = document.getElementById("aiProjects");
const downloadBtn = document.getElementById("downloadBtn");

const checkATSBtn = document.getElementById("checkATS");
const atsResult = document.getElementById("atsResult");

const contactForm = document.getElementById("contactForm");

/* ===== STEP NAVIGATION ===== */
function activatePanel(num) {
  panels.forEach(p => p.classList.remove("active"));
  steps.forEach(s => s.classList.remove("active"));
  document.getElementById("panel" + num).classList.add("active");
  document.querySelector(`.step[data-panel="${num}"]`).classList.add("active");
}

steps.forEach(step => step.addEventListener("click", () => activatePanel(step.dataset.panel)));
document.querySelectorAll(".next").forEach(btn => btn.addEventListener("click", () => activatePanel(btn.dataset.next)));
document.querySelectorAll(".back").forEach(btn => btn.addEventListener("click", () => activatePanel(btn.dataset.back)));

/* ===== LIVE PREVIEW ===== */
function updatePreview() {
  outName.textContent = nameInput.value.trim() || "Your Name";
  outRole.textContent = roleInput.value.trim() || "Your Role";
  outEmail.textContent = emailInput.value.trim() || "email@example.com";
  outPhone.textContent = phoneInput.value.trim() || "Phone";
  outSkills.textContent = skillsInput.value.trim() || "";
  outProjects.textContent = projectsInput.value.trim() || "";
  outEducation.textContent = educationInput.value.trim() || "";
  outExperience.textContent = experienceInput.value.trim() || "";
  outCertification.textContent = certificationInput.value.trim() || "";
}

[nameInput, roleInput, emailInput, phoneInput, skillsInput, projectsInput, educationInput, experienceInput, certificationInput]
  .forEach(input => input.addEventListener("input", updatePreview));

/* ===== THEME SWITCH ===== */
themeSelect.addEventListener("change", () => {
  const selectedTheme = themeSelect.value;
  document.body.classList.remove("theme-light", "theme-dark", "theme-gradient");
  document.body.classList.add(selectedTheme);
  localStorage.setItem("resumeTheme", selectedTheme);
});

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("resumeTheme") || "theme-light";
  document.body.classList.add(savedTheme);
  themeSelect.value = savedTheme;
});

/* ===== TEMPLATE SWITCH ===== */
templateSelect.addEventListener("change", () => resumeTemplate.className = "template " + templateSelect.value);

/* ===== MOCK AI SUGGESTIONS ===== */
aiSkills.addEventListener("click", () => {
  skillsInput.value = "HTML, CSS, JavaScript, Git, Problem Solving";
  updatePreview();
});

aiProjects.addEventListener("click", () => {
  projectsInput.value = "AI Resume Builder (HTML, CSS, JS)\nStudent Management System (Java)\nPortfolio Website";
  updatePreview();
});

/* ===== PDF DOWNLOAD ===== */
downloadBtn.addEventListener("click", () => {
  updatePreview();
  html2pdf().set({
    margin: [15, 15, 15, 15],
    filename: "Resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  }).from(resumeTemplate).save();
});

/* ===== ATS CHECKER ===== */
checkATSBtn.addEventListener("click", () => {
  let result = "";
  const resumeText = `
    ${outName.textContent}
    ${outRole.textContent}
    ${outEmail.textContent}
    ${outPhone.textContent}
    ${outSkills.textContent}
    ${outProjects.textContent}
    ${outEducation.textContent}
    ${outExperience.textContent}
    ${outCertification.textContent}
  `.toLowerCase();

  if (resumeText.includes("html") || resumeText.includes("css") || resumeText.includes("javascript")) {
    result += "✔ Technical skills found.\n";
  } else { result += "⚠ Missing key technical skills.\n"; }

  if (resumeText.includes("@")) result += "✔ Email detected.\n"; 
  else result += "⚠ No email found.\n";

  if (resumeText.match(/\d{10}/)) result += "✔ Contact number detected.\n"; 
  else result += "⚠ No valid contact number found.\n";

  if (resumeText.length > 200) result += "✔ Resume length is sufficient.\n"; 
  else result += "⚠ Resume is too short, consider adding more details.\n";

  atsResult.textContent = result;
});

/* ===== CONTACT FORM ===== */
contactForm.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you! We have received your message.");
  contactForm.reset();
});

/* ===== INITIAL PREVIEW ===== */
window.onload = updatePreview;
