import "../App.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="App-content">
      <p>We need to monitor these objects as good as we can.</p>

      <Link className="App-link" to="/list">
        All close objects
      </Link>
    </div>
  );
}

export default HomePage;
