import {useState} from "react"
import "./RegistrationForm.scss"

export default function RegistrationForm () {

    const [registerForm, setRegisterForm] = useState({
        email: "",
        password:"",
        confirm_password: "",
    })

    function handleFormInput (e) {
       const value = e.target.value
       const id = e.target.id
       setRegisterForm({...registerForm, [id] : value}) 
    }

     return(
        <form className="registration_form">
            <label>
                <span>Email</span>
                <input 
                type="text"
                value={registerForm["email"]}
                id= "email"
                onChange={(event) => handleFormInput(event)} />
            </label>

            <label>
                <span>Password</span>
                <input 
                type="password"
                value={registerForm["password"]}
                id= "password"
                onChange={(event) => handleFormInput(event)}  />
            </label>

            <label>
                <span>Confirm Password</span>
                <input 
                type="password" 
                value={registerForm["confirm_password"]}
                id= "confirm_password"
                onChange={(event) => handleFormInput(event)}/>
            </label>

            <input type="submit" value="Register" />
        </form>
     )
}