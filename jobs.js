const form = document.getElementById("jobForm");
const tbody = document.querySelector("tbody");

const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

function saveJobs() {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

function displayJobs() {

    tbody.innerHTML = "";

    const searchValue = searchInput.value.toLowerCase();
    const statusValue = filterStatus.value;

    const filteredJobs = jobs.filter(job => {

        const matchCompany =
            job.company.toLowerCase()
            .includes(searchValue);

        const matchStatus =
            statusValue === "All" ||
            job.status === statusValue;

        return matchCompany && matchStatus;
    });

    filteredJobs.forEach((job) => {

        const originalIndex = jobs.indexOf(job);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${job.company}</td>
            <td>${job.role}</td>
            <td>${job.status}</td>

            <td>
                <button
                class="edit-btn"
                onclick="editJob(${originalIndex})">
                Edit
                </button>

                <button
                class="delete-btn"
                onclick="deleteJob(${originalIndex})">
                Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function deleteJob(index) {

    jobs.splice(index, 1);

    saveJobs();

    displayJobs();
}

function editJob(index) {

    const job = jobs[index];

    const newCompany =
        prompt("Edit Company", job.company);

    const newRole =
        prompt("Edit Role", job.role);

    const newStatus =
        prompt(
            "Edit Status (Applied / Interview / Rejected / Selected)",
            job.status
        );

    if(newCompany && newRole && newStatus){

        jobs[index] = {
            company: newCompany,
            role: newRole,
            status: newStatus
        };

        saveJobs();

        displayJobs();
    }
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const company =
        document.getElementById("company").value;

    const role =
        document.getElementById("role").value;

    const status =
        document.getElementById("status").value;

    jobs.push({
        company,
        role,
        status
    });

    saveJobs();

    displayJobs();

    form.reset();
});

searchInput.addEventListener("input", displayJobs);

filterStatus.addEventListener("change", displayJobs);

displayJobs();