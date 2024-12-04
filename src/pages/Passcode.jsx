import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useAuthProvider} from "../providers/AuthProvider.jsx"
import AppHeader from "../components/appHeader/AppHeader.jsx"
import "../styles/Passcode.scss"

export default function Passcode () {
    const {API, axios, userAuth, setUserAuth} = useAuthProvider()
    const navigate = useNavigate()
    const [passcode, setPasscode] = useState("")

    function handlePasscode (e) {
        e.preventDefault()
        const passcodeObj = {
            user_id: userAuth["user_id"],
            passcode: passcode
        }
       
        axios.post(`${API}/auth/login`, passcodeObj).then(({data}) => {
            const { token, user_id, email } = data;

        localStorage.setItem("icapital_user_email", email);
        localStorage.setItem("token", token);

        setUserAuth({
          ...userAuth,
          user_id: user_id,
          authToken: token,
          email: email,
        });

        //   timeout for loading while fetching b4 navigate
        setTimeout(() => {
          // HERE NAVIGATE TO PROTECTED ROUTE (USER DASHBOARD) TO THEN MAKE CALL WITH TOKEN TO GET USER BUDGET INFO
          navigate("/dashboard");
        //   setLoading(false);
        }, 1000);
        }).catch(err => console.log("passcode err", err))

    }
    
    return (
        <div className="passcode">
            <AppHeader />
            <h2>Enter Passcode sent to Email</h2>
            <form className="passcode_form flex-column-center"
            onSubmit= {(event) => handlePasscode(event)}>
            <input type="text" 
            id="passcode"
            value={passcode}
            onChange={(e) =>setPasscode(e.target.value)}/>
            <input type="submit" />
        </form>
        </div>
       
    )

}