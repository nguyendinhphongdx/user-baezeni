async function login () {
    const email  = document.getElementById("uname").value;
    const password = document.getElementById("psw").value;
    console.log(axios)
    const loginStatus = await axios.post("http://localhost:3000/center-user/sign-in", {
        email,
        password
    })
console.log(loginStatus);
}