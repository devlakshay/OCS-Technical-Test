async function submitForm(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password_hash = CryptoJS.MD5(password).toString();;

    try {
        const res = await axios.post('/table-data', { username: username, password_hash: password_hash })
        let data = res.data.data;

        document.getElementById("loginForm").style.display = "none";
        let table = document.getElementById("user_table");
        document.getElementById("fetch_again").style.display = "block";
        table.style.display = "block";

        if (res.data.success) {
            data.forEach((user) => {
                let row = table.insertRow();
                let userid = row.insertCell();
                let password_hash = row.insertCell();
                let role = row.insertCell();

                userid.innerHTML = user.userid;
                role.innerHTML = user.role;
                password_hash.innerHTML = user.password_hash;

            })
        } else {
            console.error('Error submitting form:', res.data.error);
        }
    } catch (error) {
        console.error('Error submitting form:', error.message);
    }
}