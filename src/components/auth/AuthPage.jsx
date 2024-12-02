import LoginForm from "../login/LoginForm.jsx"
import RegisterForm from "../registration/RegistrationForm.jsx"
import icapitalLogo from "../../assets/icapital_logo_white.svg"
import "./AuthPage.scss"

export default function AuthPage() {

    return (
        <div className="authPage">
            <section className="authPage_header flex-column-center"><img src={icapitalLogo} alt="icapital-logo" /></section>
            <section className="authPage_forms">
                <LoginForm />
                <hr/>
                <RegisterForm />
            </section>
        </div>
    )
}