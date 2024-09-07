"use strict";
const form = document.getElementById('resume-form');
const resumeContainer = document.getElementById('generated-resume');
const editButton = document.getElementById('edit-resume');
const saveButton = document.getElementById('save-resume');
// Listen to form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get user input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const degree = document.getElementById('degree').value;
    const institution = document.getElementById('institution').value;
    const graduationYear = document.getElementById('graduation-year').value;
    const jobTitle = document.getElementById('job-title').value;
    const company = document.getElementById('company').value;
    const workYears = document.getElementById('work-years').value;
    const skills = document.getElementById('skills').value.split(',');
    if (!name || !email) {
        alert("Please fill out all mandatory fields.");
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    // Clear previous resume
    resumeContainer.innerHTML = '';
    // Dynamically generate the resume HTML
    const resumeHTML = `
        <h2 contentEditable="true">${name}</h2>
        <p contentEditable="true">Email: ${email}</p>

        <h3>Education</h3>
        <p contentEditable="true">${degree} - ${institution} (${graduationYear})</p>

        <h3>Work Experience</h3>
        <p contentEditable="true">${jobTitle} at ${company} (${workYears})</p>

        <h3>Skills</h3>
        <ul>
            ${skills.map(skill => `<li contentEditable="true">${skill.trim()}</li>`).join('')}
        </ul>
    `;
    // Append the generated resume to the container
    resumeContainer.innerHTML = resumeHTML;
    // Show edit and save buttons
    editButton.style.display = 'inline';
    saveButton.style.display = 'inline';
});
// Enable editing of the resume content
editButton.addEventListener('click', () => {
    var _a;
    const isEditable = ((_a = resumeContainer.querySelector('[contentEditable]')) === null || _a === void 0 ? void 0 : _a.getAttribute('contentEditable')) === 'true';
    resumeContainer.querySelectorAll('[contentEditable]').forEach(element => {
        element.contentEditable = isEditable ? 'false' : 'true';
    });
    editButton.textContent = isEditable ? 'Edit Resume' : 'Done Editing';
});
// Save changes made to the resume
saveButton.addEventListener('click', () => {
    resumeContainer.querySelectorAll('[contentEditable]').forEach(element => {
        element.contentEditable = 'false';
    });
    editButton.textContent = 'Edit Resume';
    alert('Changes saved!');
});
