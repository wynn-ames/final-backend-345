import fetch from "node-fetch";


//frontend api functions

function registerUser(name, phone, email, password){

    const response = await fetch('https://cs-backend.herokuapp.com/register', {
        method: 'post',
        body: {
            name: name,
            email: email,
            phone: phone,
            password: password
        }
        
    })

    const data = await response()
    return data

}

function loginUser(email, password) {

    const response = await fetch('https://cs-backend.herokuapp.com/login', {
        method: 'post',
        body: {
            email: email,
            password: password
        }
    })

    const data = await response()

    return data

}

function updateUser(data) {

}