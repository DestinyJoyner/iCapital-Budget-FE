import LoginForm from "../login/LoginForm.jsx"
import RegisterForm from "../registration/RegistrationForm.jsx"
import AppHeader from "../appHeader/AppHeader.jsx"
import "./AuthPage.scss"

export default function AuthPage() {

    return (
        <div className="authPage">
            <AppHeader />
            <span className="subtext-font authPage_disclaimer">
                        Note: Due to backend hosting services, initial login after periods of inactivity may take 30-45 seconds to process.
                    </span>
            <section className="authPage_forms">
                <LoginForm />
                <hr/>
                <RegisterForm />
            </section>
        </div>
    )
}