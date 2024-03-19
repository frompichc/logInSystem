const nameUser = document.getElementById('name');
const emailUser = document.getElementById('email');
const passwordUser = document.getElementById('password');
const passwordConUser = document.getElementById("confirm-password");
const submitBtn = document.getElementById('submitBtn');
let alertMessage = document.getElementById(`alert-message-name`);
//const alertBox = document.getElementById('alert-box');
//const alertMessage = document.getElementById('alert-message');

submitBtn.addEventListener('click', () => {
    const createUser = validateInput();
    if (createUser) {
        fetch('/register-user/create-user', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                name: nameUser.value,
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

const validateData = (data) => {
    if(data.name){
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        location.href = '/';
    } else {
        showAlertBox(data.message, data.objectMessage);
    }
}

const validateInput = () => {
    alertMessage.innerText = "";
    //Name validation
    if(nameUser.value.trim() === "") {
        nameUser.style.border = '2px solid rgba(228, 21, 21)'
        showAlertBox(
            `Please enter a valid name`,
            `alert-message-name`
        )
        return false
    } else {
        nameUser.style.border = '1px solid #fff'
    }
    //Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(emailUser.value);
    if (!validEmail) {
        emailUser.style.border = '2px solid rgba(228, 21, 21)'
        
        return false
    } else {
        emailUser.style.border = '1px solid #fff'
    }
    //Password validation
    if(passwordUser.value.trim() === "") {
        passwordUser.style.border = '2px solid rgba(228, 21, 21)'
        showAlertBox(
            "Invalid password",
            "alert-message-password"
        )
        return false
    } else {
        passwordUser.style.border = '1px solid #fff'
        passwordConUser.style.border = '1px solid #fff'
    }
    /*Password confirmation validation
    if(passwordConUser.value.trim() === "") {
        passwordConUser.style.border = '2px solid rgba(228, 21, 21)'
        return false
    } else {
        passwordConUser.style.border = '1px solid #fff'
    }*/
    //Password and confirm password validation
    if(passwordConUser.value.trim() !== passwordUser.value.trim()) {
        passwordConUser.style.border = '2px solid rgba(228, 21, 21)'
        passwordUser.style.border = '2px solid rgba(228, 21, 21)'
        showAlertBox(
            `Password does not match with the confirmation`,
            `alert-message-confirm-password`
        )
        return false
    } else {
        passwordConUser.style.border = '1px solid #fff'
        passwordUser.style.border = '1px solid #fff'
    }
    return true
}

const showAlertBox = (textMessage, objectMessage) => {
    console.log(objectMessage)
    alertMessage = document.getElementById(objectMessage);
    console.log(alertMessage, textMessage);
    alertMessage.innerText = textMessage;
    /*alertMessage.innerHTML = data.message;
    alertBox.style.top = '5%';
    setTimeout(() => {
        alertBox.style.top = null;
        alertMessage.innerHTML = "";
    }, 5000)*/
}
