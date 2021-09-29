import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link className="App-link" to="/">
          <h1>☄️ Objects are approaching Earth 🌎!</h1>
        </Link>
        <Switch>
          <Route path="/list" component={ListPage} />
          <Route exact path="/details/:neo_id?" component={DetailPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
