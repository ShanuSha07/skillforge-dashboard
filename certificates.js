const form = document.getElementById("certificateForm");
const tbody = document.getElementById("certificateBody");

let certificates =
JSON.parse(localStorage.getItem("certificates")) || [];

function saveCertificates() {
    localStorage.setItem(
        "certificates",
        JSON.stringify(certificates)
    );
}

function displayCertificates() {

    tbody.innerHTML = "";

    certificates.forEach((certificate, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${certificate.name}</td>
            <td>${certificate.provider}</td>
            <td>${certificate.date}</td>
            <td>
                ${
                    certificate.url
                    ? `<a href="${certificate.url}" target="_blank">View</a>`
                    : "N/A"
                }
            </td>
            <td>
                <button
                class="delete-btn"
                onclick="deleteCertificate(${index})">
                Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function deleteCertificate(index) {

    certificates.splice(index, 1);

    saveCertificates();

    displayCertificates();
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
    document.getElementById("certificateName").value;

    const provider =
    document.getElementById("provider").value;

    const date =
    document.getElementById("completionDate").value;

    const url =
    document.getElementById("certificateUrl").value;

    certificates.push({
        name,
        provider,
        date,
        url
    });

    saveCertificates();

    displayCertificates();

    form.reset();
});

displayCertificates();