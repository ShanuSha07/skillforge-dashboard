const form = document.getElementById("skillForm");
const skillsContainer = document.getElementById("skillsContainer");

let skills =
JSON.parse(localStorage.getItem("skills")) || [];

function saveSkills() {
    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
    );
}

function displaySkills() {

    skillsContainer.innerHTML = "";

    skills.forEach((skill, index) => {

        const card =
        document.createElement("div");

        card.className = "skill-card";

        card.innerHTML = `
            <h3>${skill.name}</h3>

            <div class="progress-bar">
                <div
                    class="progress-fill"
                    style="width:${skill.progress}%;">
                </div>
            </div>

            <p>${skill.progress}%</p>

            <button
            class="delete-btn"
            onclick="deleteSkill(${index})">
            Delete
            </button>
        `;

        skillsContainer.appendChild(card);
    });
}

function deleteSkill(index){

    skills.splice(index,1);

    saveSkills();

    displaySkills();
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const skillName =
    document.getElementById("skillName").value;

    const skillProgress =
    document.getElementById("skillProgress").value;

    skills.push({
        name: skillName,
        progress: skillProgress
    });

    saveSkills();

    displaySkills();

    form.reset();
});

displaySkills();