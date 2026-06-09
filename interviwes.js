const form = document.getElementById("interviewForm");
const tbody = document.getElementById("interviewBody");

let interviews =
JSON.parse(localStorage.getItem("interviews")) || [];

function saveInterviews() {
    localStorage.setItem(
        "interviews",
        JSON.stringify(interviews)
    );
}

function displayInterviews() {

    tbody.innerHTML = "";

    interviews.forEach((item, index) => {

        const row =
        document.createElement("tr");

        row.innerHTML = `
            <td>${item.company}</td>
            <td>${item.date}</td>
            <td>${item.round}</td>
            <td>${item.status}</td>

            <td>
                <button
                class="delete-btn"
                onclick="deleteInterview(${index})">
                Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function deleteInterview(index){

    interviews.splice(index,1);

    saveInterviews();

    displayInterviews();
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const company =
    document.getElementById("company").value;

    const date =
    document.getElementById("date").value;

    const round =
    document.getElementById("round").value;

    const status =
    document.getElementById("status").value;

    interviews.push({
        company,
        date,
        round,
        status
    });

    saveInterviews();

    displayInterviews();

    form.reset();
});

displayInterviews();