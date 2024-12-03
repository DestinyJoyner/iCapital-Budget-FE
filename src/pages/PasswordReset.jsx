import {useEffect, useState} from "react"
import {useParams, Navigate} from "react-router-dom"
import {useAuthProvider} from "../providers/AuthProvider.jsx"
import {handleFormTextInput} from "../utils/authFormFunctions.js"

export default function PasswordReset () {
    // page linked from email, with verfication code in url -> useParams() to send to BE password controller in useEffect, when validated, reveal new password form on submission, send to be for PUT request

    // no verificationToken, means just linked here to initiate password rest, user submits email for verification, then receives email, then linked back here w/ token to set new password

    const {API, axios} = useAuthProvider()
    const {verificationToken} = useParams()

    const [userEmail, setUserEmail] = useState("")
    const [resetLinkSent, setResetLink] = useState(false)

    const [tokenVerified, setTokenVerified] = useState(false)
    const [password, setPassword] = useState({
        new_password: "",
        confirm_password: ""
    })

    const [passwordMatch, setPasswordMatch] = useState(false)

    function handleEmailSubmit (e) {
        e.preventDefault()
        axios.post(`${API}/auth/password`, {email:userEmail}).then(({data}) => setResetLink(true)).catch(err => console.log("password reset request failed,", err))
    }

    // submission on new passwords

    // verify token in url
    useEffect(() => {
        if(verificationToken){
            axios.get(`${API}/auth/password/verify-token/${verificationToken}`).then(({data}) => {
                setUserEmail(data.email)
                setTokenVerified(true)
            }).catch(err => console.log("Verification Token error", err))
        }
    },[])
    
    // track values for password and confirm password
    useEffect(() => {
        if(password["new_password"] && password["confirm_password"]){
            if(password["new_password"] === password["confirm_password"]){
                setPasswordMatch(true)
            }
        }
       
    },[password["new_password"] ,password["confirm_password"]])

    return !verificationToken ?
    !resetLinkSent ?
        <form className="password_reset_form"
        onSubmit ={(e) => handleEmailSubmit(e)}>
            <h2>Enter Email Address</h2>
            <label>
                <input type="email"
                value = {userEmail}
                onChange={(e) => setUserEmail(e.target.value)} />
            </label>
            <input type="submit" />
        </form> 
        :
        <h2>Check Email for Password Reset Link</h2>
    
        :
        verificationToken && tokenVerified ?
        <form>
            <h2>Create New Password</h2>
            <label>
                <span>New Password</span>
            <input type="password"
            id={"new_password"}
            value={password["new_password"]}
            onChange ={(e) =>handleFormTextInput (e, password, setPassword) }
            />

            </label>

            <label>
                <span>Confirm New Password</span>
            <input type="password" 
            id={"confirm_password"}
            value={password["confirm_password"]}
            onChange ={(e) =>handleFormTextInput (e, password, setPassword) }
            />
            </label>
            <span>{passwordMatch ? "Passwords Match" : "Passwords don't match"}</span>
           { passwordMatch && <input type="submit" 
             />}
        </form>
        :
        // <Navigate to="/auth" />
        <h2>Something went wrong</h2>
    
}