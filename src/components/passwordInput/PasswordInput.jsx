import {useState} from "react"
import {handleFormTextInput} from "../../utils/authFormFunctions.js"
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import "./PasswordInput.scss"

export default function PasswordInput ({password, confirmPassword, stateVar, setFunction, passwordMatch}) {
const [showPassword, setShowPassword] = useState(false)

    return (
        <>
        <label >
            <div className = "password_container">
            <input
              type={showPassword ? "text" : "password"}
              id={password}
              value={stateVar["password"]}
              onChange={(e) => handleFormTextInput(e, stateVar, setFunction)}
               //   regex pattern to check input value for requirements
               pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
               title="Must contain at least 8+ characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
            />
            <button className="password_show"
            type="button"
            onClick={(e) => {
                e.preventDefault()
                setShowPassword(!showPassword)}}>{showPassword ? "Hide" : "Show"}</button>
            </div>
            
            <span>Password</span>
            <p className="helperText">8+ chars: upper, lower, number, symbol</p>
            

          </label>

          <label>
            <input
              type={showPassword ? "text" : "password"}
              id={confirmPassword}
              value={stateVar[confirmPassword]}
              onChange={(e) => handleFormTextInput(e, stateVar, setFunction)}
            //   regex pattern to check input value for requirements
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
  title="Must contain at least 8+ characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
            />
            <span>Confirm Password</span>
          </label>
          <span className="password_match">
            {passwordMatch ? <span><FaCheckCircle color={"green"} /> Passwords Match  </span>: <span> <FaCircleXmark color={"red"} /> Invalid Password Format </span>}
          </span>
        </>
    )
}