//  Form Validations and Submition.
// let loginHoldingData = () => {

//     let Login_rememberCheckbox = document.querySelector('.Login_rememberCheckbox');
//     let localData = JSON.parse(localStorage.getItem('user_details'));
//     // console.log(localData);
    
//     Login_rememberCheckbox.addEventListener('click',() => {
//         // console.log(Login_rememberCheckbox.checked);
//         if(Login_rememberCheckbox.checked === true) {
//             if(localData) {
//                console.log(Login_rememberCheckbox.checked);
//                document.querySelector('.Login_inputEmail').value = localData.Login_inputEmail;
//                document.querySelector('.Login_inputPassword').value = localData.Login_inputPassword;
//             }
//             else {
//                 document.querySelector('.loginError').style.display = 'block';
//                 document.querySelector('.loginError').innerHTML = 'There is no data inside the local storage.'
//             }
//         }    

//     });

// };

// document.addEventListener('DOMContentLoaded', () => {
//     loginHoldingData();
// });

let loginInfo = () => {
    let Login_inputEmail = document.querySelector(`.Login_inputEmail`).value;
    let Login_inputPassword = document.querySelector(`.Login_inputPassword`).value;
    let loginError = document.querySelector(`.loginError`);
    loginError.style.display = 'block';
    setTimeout(() => {
        loginError.style.display = 'none';
    },3000)


    try {
        if(!Login_inputEmail || !Login_inputPassword) {
            throw 'Null_Values';   
        } else {
            // alert('Data Stored Successfully In Local Storage .');

            loginError.style.display = 'none';
            let user_details = {
                Login_inputEmail,
                Login_inputPassword
            };
            axios.post('/loginDetails',user_details).then((response) => {
                console.log('Data from Client through POST method:',response);
                console.log('\n\n',response.data.msg,'\n\n');
                
                if(response.data.msg == 'Valid') {
                    loginError.style.display = 'none';
                    loadSelectedTemplate('productDetails');

                    document.querySelector('.Login_inputEmail').value = '';
                    document.querySelector('.Login_inputPassword').value = '';
                }
                else if(response.data.msg == 'Invalid') {
                    loginError.style.display = 'block';
                    loginError.innerHTML = "Email and Password doesn't match.";

                    document.querySelector('.Login_inputEmail').value = '';
                    document.querySelector('.Login_inputPassword').value = '';
                }
            });
            // localStorage.setItem('user_details', JSON.stringify(user_details));
        }
    }
    catch(error) {

        switch(error) {
            case 'Null_Values':
                loginError.innerHTML = `Must fill all the fields.`;
                break; 
            default:
                loginError.innerHTML = 'An unexpected error occurred.';
                break;    
        }
    }
};

// Show and Hide Password.

function Login_Eye_Open() {
    let Login_inputPassword = document.querySelector(`.Login_inputPassword`);
    let eyeOpen = document.querySelector(`.eyeOpen`);
    let eyeClose = document.querySelector(`.eyeClose`);
    if (Login_inputPassword.type === `password`) {
        Login_inputPassword.type = `text`;
        eyeOpen.style.display = `none`;
        eyeClose.style.display = `inline`;

    }
};
function Login_Eye_Close() {
    let Login_inputPassword = document.querySelector(`.Login_inputPassword`);
    let eyeOpen = document.querySelector(`.eyeOpen`);
    let eyeClose = document.querySelector(`.eyeClose`);
    if (Login_inputPassword.type === `text`) {
        Login_inputPassword.type = `password`;
        eyeOpen.style.display = `inline`;
        eyeClose.style.display = `none`;
    }
};

// Captcha Generator.

function Captcha_Generator() {
    let Login_inputCaptcha = document.querySelector(`.Login_inputCaptcha`).value;
    let captchaString = document.querySelector(`.captchaString`).innerHTML;
    if(Login_inputCaptcha === captchaString) {
          let Login_loginButton = document.querySelector(`.Login_loginButton`);
          Login_loginButton.disabled = false;

          Login_loginButton.addEventListener('click',() => {
             document.querySelector(`.Login_inputCaptcha`).value = '';
          })
    }
    else {
        let Login_loginButton = document.querySelector(`.Login_loginButton`);
        Login_loginButton.disabled = true;
    }
}

let reloadCaptcha = () => {
    let captchaString = document.querySelector(`.captchaString`);
    let Captcha_String = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
    let temp = ``;

    for(let i=0 ; i<5 ; i++) {
        temp += Captcha_String[Math.floor(Math.random()*Captcha_String.length)];
    } 
    captchaString.innerHTML = temp;
    if(temp === document.querySelector(`.Login_inputCaptcha`).value) {
         document.querySelector(`.Login_loginButton`).disabled = false;
    }
    else {
        document.querySelector(`.Login_loginButton`).disabled = true;
    }
};

if(window.location.href.includes('#Login')) {
    loadSelectedTemplate('Login');
}















