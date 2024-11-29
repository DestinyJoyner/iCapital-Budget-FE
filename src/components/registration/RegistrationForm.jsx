import {useState} from "react"
import {useAuthProvider} from "../../providers/AuthProvider.jsx"
import "./RegistrationForm.scss"

export default function RegistrationForm () {
const {API, axios} = useAuthProvider()

    const [registerForm, setRegisterForm] = useState({
        first_name:"",
        email: "",
        password:"",
        confirm_password: "",
    })

    function handleFormInput (e) {
       const value = e.target.value
       const id = e.target.id
       setRegisterForm({...registerForm, [id] : value}) 
    }

    function handleRegisterSubmit(e) {
        e.preventDefault()
        axios.post(`${API}/auth/register`, {
            login: registerForm
        }).then(({data}) =>{
            console.log("register response", data)
            /* 
            response includes : {email, first_name, id, verification_token, is_verified}
            */
        }).catch((err) => console.log(err))
    }

     return(
        <form className="registration_form"
        onSubmit={(event) => handleRegisterSubmit(event)}>
            <label>
                <span>First Name</span>
                <input 
                type="text"
                value={registerForm["first_name"]}
                id= "first_name"
                onChange={(event) => handleFormInput(event)} />
            </label>
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