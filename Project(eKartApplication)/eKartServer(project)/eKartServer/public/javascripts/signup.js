
let signupInfo = () => {

    let Signup_inputName = document.querySelector('.Signup_inputName').value;
    let Signup_inputEmail = document.querySelector('.Signup_inputEmail').value;
    let Signup_inputPassword = document.querySelector('.Signup_inputPassword').value;
    let Signup_inputMobile = document.querySelector('.Signup_inputMobile').value;
    let signupError = document.querySelector('.signupError');
    let gmail = '@gmail.com';
    let Special_Characters = ['@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '-', '+', '{', '}', '|', '.', '/', ',', '<', '>', '?', '!'];
    let Numeric_Numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let UpperCase_Letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    signupError.style.display = 'block';

    setTimeout(() => {
        signupError.style.display = 'none';
    },3000)


    try {
        if (!Signup_inputName || !Signup_inputEmail || !Signup_inputMobile || !Signup_inputPassword) {
            throw 'Null_Values';
        } else if (Special_Characters.some((char) => Signup_inputName.includes(char))) {
            throw 'Name_Special_Characters';
        } else if (Signup_inputMobile.length !== 10) {
            throw 'Mobile_Number';
        } else if (Signup_inputEmail.indexOf('@') == 0) {
            throw 'Gmail_Format';
        } else if (!Signup_inputEmail.endsWith(gmail)) {
            throw 'Gmail_Format';
        } else if (Signup_inputPassword.length < 8) {
            throw 'Password_Length';
        } else if (!Special_Characters.some((char) => Signup_inputPassword.includes(char))) {
            throw 'Password_Special_Characters';
        } else if (!Numeric_Numbers.some((num) => Signup_inputPassword.includes(num))) {
            throw 'Numeric_Numbers';
        } else if (!UpperCase_Letters.some((uppercase) => Signup_inputPassword.includes(uppercase))) {
            throw 'UpperCase_Letters';
        } else {
            signupError.style.display = 'none';
            let user_details = {
                Signup_inputName,
                Signup_inputEmail,
                Signup_inputMobile,
                Signup_inputPassword
            };
            // localStorage.setItem('user_details', JSON.stringify(user_details));
            console.log('Signup Details:',user_details);
            axios.post('/signupNewUser',user_details).then((response) => {
                console.log(response);
                if(response.data.msg == 'Valid') {
                    document.querySelector('.signupSuccess').style.display = 'block';
                    document.querySelector('.signupSuccess').innerHTML = 'Signup successfully.';

                    document.querySelector('.Signup_inputName').value = '';
                    document.querySelector('.Signup_inputEmail').value = '';
                    document.querySelector('.Signup_inputPassword').value = '';
                    document.querySelector('.Signup_inputMobile').value = '';

                    setTimeout(() => {
                        document.querySelector('.signupSuccess').style.display = 'none';
                    },3000);

                }
            }).catch((error) => {
                console.log('Error while hitting the server.');
                console.log(error);
            })

        }
    } catch (error) {
        switch (error) {
            case 'Null_Values':
                signupError.innerHTML = 'Must fill all the fields.';
                break;
            case 'Name_Special_Characters':
                signupError.innerHTML = 'No special characters are allowed in the name field.';
                break;
            case 'Mobile_Number':
                signupError.innerHTML = 'Mobile number must have 10 digits.';
                break;
            case 'Gmail_Format':
                signupError.innerHTML = 'Invalid Gmail format.';
                break;
            case 'Password_Length':
                signupError.innerHTML = 'Password length must be 8 characters.';
                break;
            case 'Password_Special_Characters':
                signupError.innerHTML = 'Password must have at least 1 special character.';
                break;
            case 'Numeric_Numbers':
                signupError.innerHTML = 'Password must have at least 1 numeric number.';
                break;
            case 'UpperCase_Letters':
                signupError.innerHTML = 'Password must have at least 1 uppercase letter.';
                break;
        }
    }
};

function Signup_Eye_Open() {
    let Signup_inputPassword = document.querySelector('.Signup_inputPassword');
    let eyeOpen = document.querySelector('.eyeOpen');
    let eyeClose = document.querySelector('.eyeClose');
    if (Signup_inputPassword.type === 'password') {
        Signup_inputPassword.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClose.style.display = 'inline';
    }
}

function Signup_Eye_Close() {
    let Signup_inputPassword = document.querySelector('.Signup_inputPassword');
    let eyeOpen = document.querySelector('.eyeOpen');
    let eyeClose = document.querySelector('.eyeClose');
    if (Signup_inputPassword.type === 'text') {
        Signup_inputPassword.type = 'password';
        eyeOpen.style.display = 'inline';
        eyeClose.style.display = 'none';
    }
}

if(window.location.href.includes('#Signup')) {
    loadSelectedTemplate('Signup');
}