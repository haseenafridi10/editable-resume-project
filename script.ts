const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeContainer = document.getElementById('generated-resume') as HTMLElement;
const editButton = document.getElementById('edit-resume') as HTMLButtonElement;
const saveButton = document.getElementById('save-resume') as HTMLButtonElement;

// Listen to form submission
form.addEventListener('submit', function(event: Event) {
    event.preventDefault();

    // Get user input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const institution = (document.getElementById('institution') as HTMLInputElement).value;
    const graduationYear = (document.getElementById('graduation-year') as HTMLInputElement).value;
    const jobTitle = (document.getElementById('job-title') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const workYears = (document.getElementById('work-years') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

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
    const isEditable = resumeContainer.querySelector('[contentEditable]')?.getAttribute('contentEditable') === 'true';
    resumeContainer.querySelectorAll('[contentEditable]').forEach(element => {
        (element as HTMLElement).contentEditable = isEditable ? 'false' : 'true';
    });
    editButton.textContent = isEditable ? 'Edit Resume' : 'Done Editing';
});

// Save changes made to the resume
saveButton.addEventListener('click', () => {
    resumeContainer.querySelectorAll('[contentEditable]').forEach(element => {
        (element as HTMLElement).contentEditable = 'false';
    });
    editButton.textContent = 'Edit Resume';
    alert('Changes saved!');
});
