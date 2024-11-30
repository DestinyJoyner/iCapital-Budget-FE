import {useState} from "react"
import { useNavigate} from "react-router-dom";
import {useAuthProvider} from "../../providers/AuthProvider.jsx"
import "./RegistrationForm.scss"

export default function RegistrationForm () {
const {API, axios, setVerificationToken,
    userAuth,
    setUserAuth} = useAuthProvider()

    const navigate = useNavigate()

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
            const {email, first_name, id, is_verified } = data

            // setVerificationToken(verification_token)
            setUserAuth({
                ...userAuth,
                email,
                first_name,
                id,
                is_verified
            })
            localStorage.setItem("icapital_user_email", email)
            navigate("/verification")
            /* 
            response includes {email: 'destinytestdev@gmail.com', first_name: 'Destiny', id: 4, verification_token: '712afc709ab67db9f74113435840343243422742e20893131d59f537ff734aa8', is_verified: false, …}
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