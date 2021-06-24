import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";
import Room from "./pages/Room";
import AdminRoom from "./pages/AdminRoom";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/room/new" exact component={NewRoom} />
        <Route path="/room/:id" exact component={Room} />
        <Route path="/admin/room/:id" exact component={AdminRoom} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
