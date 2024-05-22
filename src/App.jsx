import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ChooseScreen from "./screens/ChooseScreen";
import { StoreProvider } from "./Store";
import OrderScreen from "./screens/OrderScreen";
import Notice from "./screens/Notice";

export default function App() {
  return (
    <StoreProvider>
      <div className="screen">
        <Routes>
          <Route index Component={HomeScreen} exact={true} />
          <Route path="/notice" Component={Notice} exact={true} />
          <Route path="/choose" Component={ChooseScreen} exact={true} />
          <Route path="/order" Component={OrderScreen} exact={true}></Route>
        </Routes>
      </div>
    </StoreProvider>
  );
}
