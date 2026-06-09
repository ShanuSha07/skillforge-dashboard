const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const appliedCount =
jobs.filter(job => job.status === "Applied").length;

const interviewCount =
jobs.filter(job => job.status === "Interview").length;

const selectedCount =
jobs.filter(job => job.status === "Selected").length;

const rejectedCount =
jobs.filter(job => job.status === "Rejected").length;

document.getElementById("totalApplications").textContent =
jobs.length;

document.getElementById("appliedCount").textContent =
appliedCount;

document.getElementById("interviewCount").textContent =
interviewCount;

document.getElementById("selectedCount").textContent =
selectedCount;

const ctx =
document.getElementById("statusChart");

new Chart(ctx, {

    type: "bar",

    data: {

        labels: [
            "Applied",
            "Interview",
            "Selected",
            "Rejected"
        ],

        datasets: [{

            label: "Applications",

            data: [
                appliedCount,
                interviewCount,
                selectedCount,
                rejectedCount
            ]

        }]
    }

});
const themeToggle =
document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }

});

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}