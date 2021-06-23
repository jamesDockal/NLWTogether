import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";
import Room from "./pages/Room";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/room/new" exact component={NewRoom} />
        <Route path="/room/:id" component={Room} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
