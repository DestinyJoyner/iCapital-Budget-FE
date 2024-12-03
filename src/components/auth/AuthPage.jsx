import LoginForm from "../login/LoginForm.jsx"
import RegisterForm from "../registration/RegistrationForm.jsx"
import AppHeader from "../appHeader/AppHeader.jsx"
import "./AuthPage.scss"

export default function AuthPage() {

    return (
        <div className="authPage">
            <AppHeader />
            <section className="authPage_forms">
                <LoginForm />
                <hr/>
                <RegisterForm />
            </section>
        </div>
    )
}