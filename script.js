"use strict";

const form = document.getElementById("colonyForm");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const compatibilityScore =
    document.getElementById("compatibilityScore");

const scoreMessage =
    document.getElementById("scoreMessage");

const applicationClass =
    document.getElementById("applicationClass");

const reviewModal =
    document.getElementById("reviewModal");

const reviewContent =
    document.getElementById("reviewContent");

const successScreen =
    document.getElementById("successScreen");



const fields = {
    fullName: document.getElementById("fullName"),
    age: document.getElementById("age"),
    nationality: document.getElementById("nationality"),

    email: document.getElementById("email"),
    phone: document.getElementById("phone"),

    profession: document.getElementById("profession"),
    department: document.getElementById("department"),
    missionRole: document.getElementById("missionRole"),
    experience: document.getElementById("experience"),
    duration: document.getElementById("duration"),

    skills: document.getElementById("skills"),
    spaceExperience:
        document.getElementById("spaceExperience"),
    reason: document.getElementById("reason"),

    zone: document.getElementById("zone"),
    accommodation:
        document.getElementById("accommodation"),
    food: document.getElementById("food"),

    emergencyName:
        document.getElementById("emergencyName"),
    relationship:
        document.getElementById("relationship"),
    emergencyPhone:
        document.getElementById("emergencyPhone"),

    password: document.getElementById("password"),
    confirmPassword:
        document.getElementById("confirmPassword"),

    agreement:
        document.getElementById("agreement")
};


const patterns = {

    name:
        /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{3,60}$/,

  
    email:
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,

    
    phone:
        /^(?:\+92|0092|0)?3\d{9}$/,

    profession:
        /^[A-Za-z0-9À-ÖØ-öø-ÿ&' .-]{2,50}$/,

    skills:
        /^[A-Za-z0-9À-ÖØ-öø-ÿ,./+#&' ()-]{5,120}$/,

    password:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,40}$/
};


const departmentRoles = {

    engineering: [
        "Systems Engineer",
        "Mechanical Engineer",
        "Civil Engineer",
        "Energy Engineer"
    ],

    medical: [
        "Colony Doctor",
        "Medical Researcher",
        "Emergency Specialist",
        "Health Coordinator"
    ],

    research: [
        "Astrobiologist",
        "Planetary Scientist",
        "Environmental Researcher",
        "Physics Researcher"
    ],

    agriculture: [
        "Hydroponics Specialist",
        "Botanist",
        "Food Systems Manager",
        "Agricultural Engineer"
    ],

    technology: [
        "Software Engineer",
        "AI Specialist",
        "Robotics Engineer",
        "Cybersecurity Specialist"
    ],

    operations: [
        "Mission Coordinator",
        "Logistics Officer",
        "Habitat Manager",
        "Resource Planner"
    ]
};


function setError(field, message) {

    const errorElement =
        document.getElementById(field.id + "Error");

    field.classList.remove("valid");
    field.classList.add("invalid");

    field.setAttribute("aria-invalid", "true");

    if (errorElement) {
        errorElement.textContent = message;
    }

    return false;
}


function setValid(field) {

    const errorElement =
        document.getElementById(field.id + "Error");

    field.classList.remove("invalid");
    field.classList.add("valid");

    field.setAttribute("aria-invalid", "false");

    if (errorElement) {
        errorElement.textContent = "";
    }

    return true;
}


function clearFieldState(field) {

    field.classList.remove("valid", "invalid");

    field.removeAttribute("aria-invalid");

    const errorElement =
        document.getElementById(field.id + "Error");

    if (errorElement) {
        errorElement.textContent = "";
    }
}


function validateName() {

    const value =
        fields.fullName.value.trim();

    if (!value) {
        return setError(
            fields.fullName,
            "Full name is required."
        );
    }

    if (!patterns.name.test(value)) {
        return setError(
            fields.fullName,
            "Use 3–60 letters, spaces, hyphens or apostrophes only."
        );
    }

    return setValid(fields.fullName);
}


function validateAge() {

    const value =
        Number(fields.age.value);

    if (!fields.age.value) {
        return setError(
            fields.age,
            "Age is required."
        );
    }

    if (!Number.isInteger(value)) {
        return setError(
            fields.age,
            "Age must be a whole number."
        );
    }

    if (value < 18 || value > 65) {
        return setError(
            fields.age,
            "Applicants must be between 18 and 65 years old."
        );
    }

    return setValid(fields.age);
}


function validateSelect(field, label) {

    if (!field.value) {
        return setError(
            field,
            `${label} is required.`
        );
    }

    return setValid(field);
}


function validateEmail() {

    const value =
        fields.email.value.trim();

    if (!value) {
        return setError(
            fields.email,
            "Email address is required."
        );
    }

    if (!patterns.email.test(value)) {
        return setError(
            fields.email,
            "Enter a valid email address."
        );
    }

    return setValid(fields.email);
}


function validatePhone(field, label) {

    const value =
        field.value.replace(/[\s-]/g, "");

    if (!value) {
        return setError(
            field,
            `${label} is required.`
        );
    }

    if (!patterns.phone.test(value)) {
        return setError(
            field,
            "Enter a valid number, e.g. 03001234567 or +923001234567."
        );
    }

    return setValid(field);
}


function validateProfession() {

    const value =
        fields.profession.value.trim();

    if (!value) {
        return setError(
            fields.profession,
            "Profession is required."
        );
    }

    if (!patterns.profession.test(value)) {
        return setError(
            fields.profession,
            "Enter a valid profession."
        );
    }

    return setValid(fields.profession);
}


function validateSkills() {

    const value =
        fields.skills.value.trim();

    if (!value) {
        return setError(
            fields.skills,
            "Please enter your skills."
        );
    }

    if (!patterns.skills.test(value)) {
        return setError(
            fields.skills,
            "Use 5–120 valid characters."
        );
    }

    return setValid(fields.skills);
}


function validateReason() {

    const value =
        fields.reason.value.trim();

    if (!value) {
        return setError(
            fields.reason,
            "Please explain why AstraNova should select you."
        );
    }

    if (value.length < 50) {
        return setError(
            fields.reason,
            `Please write at least 50 characters. Current: ${value.length}.`
        );
    }

    return setValid(fields.reason);
}


function validateMissionRole() {

    if (!fields.missionRole.value) {
        return setError(
            fields.missionRole,
            "Please select a mission role."
        );
    }

    return setValid(fields.missionRole);
}


function validatePassword() {

    const value =
        fields.password.value;

    if (!value) {
        return setError(
            fields.password,
            "Password is required."
        );
    }

    if (!patterns.password.test(value)) {
        return setError(
            fields.password,
            "Password must contain uppercase, lowercase, number, special character and 8+ characters."
        );
    }

    return setValid(fields.password);
}


function validateConfirmPassword() {

    const value =
        fields.confirmPassword.value;

    if (!value) {
        return setError(
            fields.confirmPassword,
            "Please confirm your password."
        );
    }

    if (value !== fields.password.value) {
        return setError(
            fields.confirmPassword,
            "Passwords do not match."
        );
    }

    return setValid(fields.confirmPassword);
}


function validateAgreement() {

    const error =
        document.getElementById(
            "agreementError"
        );

    if (!fields.agreement.checked) {

        error.textContent =
            "You must accept the application terms.";

        fields.agreement.setAttribute(
            "aria-invalid",
            "true"
        );

        return false;
    }

    error.textContent = "";

    fields.agreement.setAttribute(
        "aria-invalid",
        "false"
    );

    return true;
}


function updateCounter(field, counterId, max) {

    const counter =
        document.getElementById(counterId);

    const length =
        field.value.length;

    counter.textContent =
        `${length} / ${max}`;

    if (length > max) {
        counter.style.color =
            "var(--danger)";
    } else {
        counter.style.color =
            "var(--muted)";
    }
}


function updatePasswordStrength() {

    const password =
        fields.password.value;

    const bar =
        document.getElementById(
            "passwordStrength"
        );

    const label =
        document.getElementById(
            "passwordLabel"
        );

    if (!password) {

        bar.style.width = "0%";
        label.textContent = "No password";

        return;
    }

    let score = 0;

    if (password.length >= 8) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/\d/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    const levels = {

        1: {
            width: "20%",
            label: "Very weak"
        },

        2: {
            width: "40%",
            label: "Weak"
        },

        3: {
            width: "60%",
            label: "Medium"
        },

        4: {
            width: "80%",
            label: "Strong"
        },

        5: {
            width: "100%",
            label: "Excellent"
        }
    };

    const current =
        levels[score];

    bar.style.width =
        current.width;

    label.textContent =
        current.label;
}


function updateMissionRoles() {

    const department =
        fields.department.value;

    fields.missionRole.innerHTML = "";

    if (!department) {

        const option =
            document.createElement("option");

        option.value = "";

        option.textContent =
            "Select department first";

        fields.missionRole.appendChild(option);

        fields.missionRole.disabled = true;

        clearFieldState(fields.missionRole);

        return;
    }

    fields.missionRole.disabled = false;

    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        "Select mission role";

    fields.missionRole.appendChild(
        defaultOption
    );


    departmentRoles[department].forEach(
        role => {

            const option =
                document.createElement("option");

            option.value = role;

            option.textContent = role;

            fields.missionRole.appendChild(
                option
            );
        }
    );

    clearFieldState(fields.missionRole);

    updateDashboard();
}


function validateAll() {

    const results = [

        validateName(),

        validateAge(),

        validateSelect(
            fields.nationality,
            "Nationality"
        ),

        validateEmail(),

        validatePhone(
            fields.phone,
            "Contact number"
        ),

        validateProfession(),

        validateSelect(
            fields.department,
            "Department"
        ),

        validateMissionRole(),

        validateSelect(
            fields.experience,
            "Experience level"
        ),

        validateSelect(
            fields.duration,
            "Mission duration"
        ),

        validateSkills(),

        validateReason(),

        validateSelect(
            fields.zone,
            "Colony zone"
        ),

        validateSelect(
            fields.accommodation,
            "Accommodation"
        ),

        validateSelect(
            fields.food,
            "Food preference"
        ),

        validatePhone(
            fields.emergencyPhone,
            "Emergency contact number"
        ),

        validateNameField(
            fields.emergencyName,
            "Emergency contact name"
        ),

        validateSelect(
            fields.relationship,
            "Relationship"
        ),

        validatePassword(),

        validateConfirmPassword(),

        validateAgreement()
    ];

    return results.every(
        result => result === true
    );
}

function validateNameField(field, label) {

    const value =
        field.value.trim();

    if (!value) {
        return setError(
            field,
            `${label} is required.`
        );
    }

    if (!patterns.name.test(value)) {
        return setError(
            field,
            `${label} contains invalid characters.`
        );
    }

    return setValid(field);
}


function updateDashboard() {

    const allRequired = [

        fields.fullName,
        fields.age,
        fields.nationality,
        fields.email,
        fields.phone,
        fields.profession,
        fields.department,
        fields.missionRole,
        fields.experience,
        fields.duration,
        fields.skills,
        fields.reason,
        fields.zone,
        fields.accommodation,
        fields.food,
        fields.emergencyName,
        fields.relationship,
        fields.emergencyPhone,
        fields.password,
        fields.confirmPassword
    ];

    let completed = 0;

    allRequired.forEach(field => {

        if (
            field.value &&
            !field.classList.contains("invalid")
        ) {
            completed++;
        }
    });

    if (fields.agreement.checked) {
        completed++;
    }

    const percentage =
        Math.round(
            (completed / (allRequired.length + 1)) * 100
        );

    progressBar.style.width =
        `${percentage}%`;

    progressText.textContent =
        `${percentage}%`;


    updateCompatibilityScore(
        percentage
    );
}


function updateCompatibilityScore(progress) {

    let score = 0;

    const age =
        Number(fields.age.value);

    if (age >= 18 && age <= 65) {
        score += 10;
    }

    if (fields.profession.value.trim()) {
        score += 10;
    }

    if (fields.skills.value.trim().length >= 5) {
        score += 15;
    }

    if (fields.experience.value) {

        const experiencePoints = {
            beginner: 5,
            intermediate: 10,
            advanced: 15,
            expert: 20
        };

        score +=
            experiencePoints[
                fields.experience.value
            ] || 0;
    }

    if (fields.department.value) {
        score += 10;
    }

    if (fields.missionRole.value) {
        score += 10;
    }

    if (fields.duration.value) {
        score += 5;
    }

    if (fields.reason.value.trim().length >= 50) {
        score += 10;
    }

    if (fields.agreement.checked) {
        score += 5;
    }


    compatibilityScore.textContent =
        Math.min(score, 100);


    if (score >= 80) {

        scoreMessage.textContent =
            "Excellent colony compatibility";

        applicationClass.textContent =
            "PRIORITY";

    } else if (score >= 60) {

        scoreMessage.textContent =
            "Strong candidate profile";

        applicationClass.textContent =
            "QUALIFIED";

    } else if (score >= 40) {

        scoreMessage.textContent =
            "Profile needs improvement";

        applicationClass.textContent =
            "STANDARD";

    } else {

        scoreMessage.textContent =
            "Complete your profile";

        applicationClass.textContent =
            "PENDING";
    }
}


function getFormData() {

    return {

        "Full Name":
            fields.fullName.value.trim(),

        "Age":
            fields.age.value,

        "Nationality":
            fields.nationality.value,

        "Email":
            fields.email.value.trim(),

        "Contact":
            fields.phone.value.trim(),

        "Profession":
            fields.profession.value.trim(),

        "Department":
            fields.department.options[
                fields.department.selectedIndex
            ].text,

        "Mission Role":
            fields.missionRole.value,

        "Experience":
            fields.experience.options[
                fields.experience.selectedIndex
            ].text,

        "Mission Duration":
            fields.duration.options[
                fields.duration.selectedIndex
            ].text,

        "Skills":
            fields.skills.value.trim(),

        "Colony Zone":
            fields.zone.options[
                fields.zone.selectedIndex
            ].text,

        "Accommodation":
            fields.accommodation.options[
                fields.accommodation.selectedIndex
            ].text,

        "Food Preference":
            fields.food.options[
                fields.food.selectedIndex
            ].text,

        "Emergency Contact":
            fields.emergencyName.value.trim(),

        "Relationship":
            fields.relationship.value,

        "Emergency Phone":
            fields.emergencyPhone.value.trim()
    };
}


function createReview() {

    const data =
        getFormData();

    reviewContent.innerHTML = "";

    Object.entries(data).forEach(
        ([label, value]) => {

            const item =
                document.createElement("div");

            item.className =
                "review-item";

            const small =
                document.createElement("small");

            small.textContent =
                label;

            const strong =
                document.createElement("strong");

            strong.textContent =
                value || "Not provided";

            item.appendChild(small);
            item.appendChild(strong);

            reviewContent.appendChild(item);
        }
    );
}


function generateApplicationId() {

    const random =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return `ASTRA-${random}`;
}


function showReview() {

    const valid =
        validateAll();

    updateDashboard();

    if (!valid) {

        const firstInvalid =
            form.querySelector(
                ".invalid"
            );

        if (firstInvalid) {
            firstInvalid.focus();
        }

        return;
    }

    createReview();

    reviewModal.classList.add("show");

    reviewModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

    document.getElementById(
        "closeReview"
    ).focus();
}


function closeReview() {

    reviewModal.classList.remove("show");

    reviewModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

    document.getElementById(
        "reviewBtn"
    ).focus();
}


function submitApplication() {

    const valid =
        validateAll();

    if (!valid) {

        closeReview();

        return;
    }

    const score =
        compatibilityScore.textContent;

    const candidateClass =
        applicationClass.textContent;

    const applicationId =
        generateApplicationId();


    document.getElementById(
        "applicationId"
    ).textContent =
        applicationId;

    document.getElementById(
        "successScore"
    ).textContent =
        `${score}/100`;

    document.getElementById(
        "successClass"
    ).textContent =
        candidateClass;


    reviewModal.classList.remove("show");

    form.style.display =
        "none";

    document.querySelector(
        ".dashboard"
    ).style.display =
        "none";

    document.querySelector(
        ".hero"
    ).style.display =
        "none";


    successScreen.hidden = false;

    successScreen.scrollIntoView({
        behavior: "smooth"
    });

    document.title =
        "AstraNova | Application Accepted";
}


function resetApplication() {

    const confirmed =
        window.confirm(
            "Are you sure you want to clear the entire application?"
        );

    if (!confirmed) {
        return;
    }

    form.reset();

    Object.values(fields).forEach(
        field => {

            if (field) {
                clearFieldState(field);
            }
        }
    );


    fields.missionRole.innerHTML =
        "<option value=''>Select department first</option>";

    fields.missionRole.disabled =
        true;


    document.getElementById(
        "experienceCounter"
    ).textContent =
        "0 / 500";

    document.getElementById(
        "reasonCounter"
    ).textContent =
        "0 / 500";


    document.getElementById(
        "passwordStrength"
    ).style.width =
        "0%";

    document.getElementById(
        "passwordLabel"
    ).textContent =
        "No password";


    progressBar.style.width =
        "0%";

    progressText.textContent =
        "0%";

    compatibilityScore.textContent =
        "0";

    scoreMessage.textContent =
        "Complete your profile";

    applicationClass.textContent =
        "PENDING";


    successScreen.hidden =
        true;

    form.style.display =
        "";

    document.querySelector(
        ".dashboard"
    ).style.display =
        "";

    document.querySelector(
        ".hero"
    ).style.display =
        "";


    document.title =
        "AstraNova | Space Colony Application";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function startNewApplication() {

    successScreen.hidden =
        true;

    form.style.display =
        "";

    document.querySelector(
        ".dashboard"
    ).style.display =
        "";

    document.querySelector(
        ".hero"
    ).style.display =
        "";

    resetApplication();
}


fields.fullName.addEventListener(
    "input",
    () => {
        if (fields.fullName.value.trim()) {
            validateName();
        }

        updateDashboard();
    }
);


fields.age.addEventListener(
    "input",
    () => {
        if (fields.age.value) {
            validateAge();
        }

        updateDashboard();
    }
);


fields.email.addEventListener(
    "input",
    () => {
        if (fields.email.value.trim()) {
            validateEmail();
        }

        updateDashboard();
    }
);


fields.phone.addEventListener(
    "input",
    () => {
        if (fields.phone.value.trim()) {
            validatePhone(
                fields.phone,
                "Contact number"
            );
        }

        updateDashboard();
    }
);


fields.profession.addEventListener(
    "input",
    () => {
        if (fields.profession.value.trim()) {
            validateProfession();
        }

        updateDashboard();
    }
);


fields.skills.addEventListener(
    "input",
    () => {
        if (fields.skills.value.trim()) {
            validateSkills();
        }

        updateDashboard();
    }
);


fields.reason.addEventListener(
    "input",
    () => {

        updateCounter(
            fields.reason,
            "reasonCounter",
            500
        );

        if (fields.reason.value.trim()) {
            validateReason();
        }

        updateDashboard();
    }
);


fields.spaceExperience.addEventListener(
    "input",
    () => {

        updateCounter(
            fields.spaceExperience,
            "experienceCounter",
            500
        );

        updateDashboard();
    }
);


[
    fields.nationality,
    fields.department,
    fields.missionRole,
    fields.experience,
    fields.duration,
    fields.zone,
    fields.accommodation,
    fields.food,
    fields.relationship
].forEach(field => {

    field.addEventListener(
        "change",
        () => {

            if (field === fields.department) {
                updateMissionRoles();
            }

            if (
                field.value &&
                field !== fields.missionRole
            ) {
                const label =
                    field.previousElementSibling
                        ?.textContent
                        ?.replace("*", "")
                        .trim();

                if (label) {
                    validateSelect(
                        field,
                        label
                    );
                }
            }

            if (
                field === fields.missionRole &&
                field.value
            ) {
                validateMissionRole();
            }

            updateDashboard();
        }
    );
});


fields.emergencyName.addEventListener(
    "input",
    () => {

        if (
            fields.emergencyName.value.trim()
        ) {

            validateNameField(
                fields.emergencyName,
                "Emergency contact name"
            );
        }

        updateDashboard();
    }
);


fields.emergencyPhone.addEventListener(
    "input",
    () => {

        if (
            fields.emergencyPhone.value.trim()
        ) {

            validatePhone(
                fields.emergencyPhone,
                "Emergency contact number"
            );
        }

        updateDashboard();
    }
);


fields.password.addEventListener(
    "input",
    () => {

        updatePasswordStrength();

        if (fields.password.value) {
            validatePassword();
        }

        if (fields.confirmPassword.value) {
            validateConfirmPassword();
        }

        updateDashboard();
    }
);


fields.confirmPassword.addEventListener(
    "input",
    () => {

        if (fields.confirmPassword.value) {
            validateConfirmPassword();
        }

        updateDashboard();
    }
);


fields.agreement.addEventListener(
    "change",
    () => {

        validateAgreement();

        updateDashboard();
    }
);


document.getElementById(
    "reviewBtn"
).addEventListener(
    "click",
    showReview
);


document.getElementById(
    "closeReview"
).addEventListener(
    "click",
    closeReview
);


document.getElementById(
    "editBtn"
).addEventListener(
    "click",
    closeReview
);


document.getElementById(
    "submitBtn"
).addEventListener(
    "click",
    submitApplication
);


document.getElementById(
    "resetBtn"
).addEventListener(
    "click",
    resetApplication
);


document.getElementById(
    "newApplicationBtn"
).addEventListener(
    "click",
    startNewApplication
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            reviewModal.classList.contains("show")
        ) {
            closeReview();
        }
    }
);


updateMissionRoles();
updateDashboard();