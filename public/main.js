// const md5 = require('md5');


const element = document.querySelector('form');
element.addEventListener('submit', event => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password_hash = CryptoJS.MD5(password);
    console.log(username, password, password_hash)
    let url = 'http://localhost:3000/table-data' //to be changed 
    fetch(url, {method: 'get'})
        // .then(response => response.json())
        .then(data => {
            console.log(data);
            const role = data.cur_role;
            document.getElementById("loginForm").style.display = "none";
            let table = document.getElementById("user_table");
            document.getElementById("fetch_again").style.display = "block";
            table.style.display = "block";
            if (role == 'admin') {
                
                data.all_users.forEach((user) => {
                    let row = table.insertRow();
                    let userid = row.insertCell();
                    let password_hash = row.insertCell();
                    let role = row.insertCell();
                    
                    userid.innerHTML = user.userid;
                    role.innerHTML = user.role;
                    password_hash.innerHTML = user.password_hash;

                })
            }
            else if (role == 'basic') {
                
                let row = table.insertRow();
                let userid = row.insertCell();
                let password_hash = row.insertCell();
                let role = row.insertCell();
                
                userid.innerHTML = data.user.userid;
                role.innerHTML = data.user.role;
                password_hash.innerHTML = data.user.password_hash;

            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});