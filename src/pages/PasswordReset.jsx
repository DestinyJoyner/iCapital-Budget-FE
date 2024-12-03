import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {useAuthProvider} from "../providers/AuthProvider.jsx"

export default function PasswordReset () {
    // page linked from email, with verfication code in url -> useParams() to send to BE password controller in useEffect, when validated, reveal new password form on submission, send to be for PUT request

    // no verificationToken, means just linked here to initiate password rest, user submits email for verification, then receives email, then linked back here w/ token to set new password

    const {API, axios} = useAuthProvider()
    const {verificationToken} = useParams()

    const [userEmail, setUserEmail] = useState("")
    const [resetLinkSent, setResetLink] = useState(false)

    function handleEmailSubmit (e) {
        e.preventDefault()
        axios.post(`${API}/auth/password`, {email:userEmail}).then(({data}) => setResetLink(true)).catch(err => console.log("password reset request failed,", err))
    }


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
        <form>
            <h2>Create New Password</h2>
            <label>
            <input type="password" />
            </label>
            
        </form>
    
}