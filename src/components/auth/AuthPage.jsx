import LoginForm from "../login/LoginForm.jsx"
import RegisterForm from "../registration/RegistrationForm.jsx"
import "./AuthPage.scss"

export default function AuthPage() {

    return (
        <div className="authPage">
            <section className="authPage_forms">
                <LoginForm />
                <RegisterForm />
            </section>
        </div>
    )
}