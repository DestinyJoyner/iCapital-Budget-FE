import { PulseLoader } from "react-spinners";
import "./Loading.scss";

export default function Loading() {
  return (
    <div className="loading">
      <section className="loading_content flex-column-center">
        <h2>Loading</h2>
        <PulseLoader
          color="#3498db"
          size={20}
          margin={18}
          speedMultiplier={0.6}
        />
      </section>
    </div>
  );
}
