document.getElementById("username").addEventListener("input", validateDetails);
document.getElementById("email").addEventListener("input", validateDetails);
document.getElementById("password").addEventListener("input", validateDetails);
document.getElementById("passwordConfirm").addEventListener("input", validateDetails);
document.getElementById("privacyPolicyCheck").addEventListener("input", validateDetails);

document.getElementById("username").addEventListener("change", trimDetails);
document.getElementById("email").addEventListener("change", trimDetails);
document.getElementById("password").addEventListener("change", trimDetails);
document.getElementById("passwordConfirm").addEventListener("change", trimDetails);
document.getElementById("privacyPolicyCheck").addEventListener("change", trimDetails);


function validateDetails(event) {
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let passwordConfirm = document.getElementById("passwordConfirm");

    let privacyPolicyCheck = document.getElementById("privacyPolicyCheck");

    let registerButton = document.getElementById("registerButton");

    if (
        !(username.value.length === 0)
        && !(email.value.length === 0)
        && !(password.value.length === 0)
        && (passwordConfirm.value === password.value)
        && (privacyPolicyCheck.checked)
    ) {
        registerButton.disabled = false;
    } else {
        registerButton.disabled = true;
    }

}

function trimDetails() {
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let passwordConfirm = document.getElementById("passwordConfirm");

    username.value = username.value.trim();
    email.value = email.value.trim();
    password.value = password.value.trim();
    passwordConfirm.value = passwordConfirm.value.trim();

    validateDetails();

}