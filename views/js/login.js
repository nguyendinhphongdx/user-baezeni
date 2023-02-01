async function login() {
    const email = document.getElementById("uname").value;
    const password = document.getElementById("psw").value;
    console.log(axios)

    console.log(loginStatus);
}
let prism = document.querySelector(".rec-prism");

function showSignup() {
    prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
}
function showLogin() {
    prism.style.transform = "translateZ(-100px)";
}
function showForgotPassword() {
    prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
}

function showSubscribe() {
    prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
}

function showContactUs() {
    prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
}

async function showThankYou() {
    try {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const loginStatus = await axios.post("/center-user/api/sign-in", {
            email,
            password
        })
        prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
        await new Promise(r => setTimeout(r, 1000));
        if (loginStatus?.data?.role === 'user') {
            location.replace("/center-user/views/home");
        } else {
            location.replace("/center-user/views/users");
        }
    } catch (error) {
        if (error?.response?.data?.message) {
            error.message = error.response?.data?.message;
        }
        launch_toast(error.message);
    }
}

async function signUp() {
    try {
        const email = document.getElementById("emailSignup").value;
        const password = document.getElementById("passwordSignup").value;
        const passwordCF = document.getElementById("passwordConfirm").value;
        if (password !== passwordCF) throw new Error("password is not match");
        const signUp = await axios.post("/center-user/api/sign-up", {
            email,
            password
        })
        prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
        await new Promise(r => setTimeout(r, 1000));
        location.reload();
    } catch (error) {
        if (error?.response?.data?.message) {
            error.message = error.response?.data?.message;
        }
        launch_toast(error.message);
    }
}
