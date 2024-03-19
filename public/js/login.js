const emailUser = document.getElementById("email")
const passwordUser = document.getElementById("password")
const btnLogIn = document.getElementById("submitBtn")

btnLogIn.addEventListener('click', () => {
    const logInUser = validateInput()
    console.log(logInUser);
    if (logInUser) {
        fetch('/register-user/login', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                email: emailUser.value,
                password: passwordUser.value,
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data);
        })
    }
})

const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(emailUser.value);
    if (!validEmail) {
        emailUser.style.border = `2px solid rgba(228, 21, 21)`
        return false;
    } else emailUser.style.border = `1px solid #fff`;

    if (passwordUser.value.trim() === "") {
        passwordUser.style.border = `2px solid rgba(228, 21, 21)`
        return false;
    } else passwordUser.style.border = `1px solid #fff`;
    return true;
}

const validateData = (data) => {

}