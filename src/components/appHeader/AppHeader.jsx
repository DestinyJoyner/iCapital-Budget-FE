import icapitalLogo from "../../assets/icapital_logo_white.svg";
import "./AppHeader.scss";

export default function AppHeader() {
  return (
    <section className="appHeader flex-column-center">
      <img src={icapitalLogo} alt="icapital-logo" />
    </section>
  );
}
