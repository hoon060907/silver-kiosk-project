import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ChooseScreen from "./screens/ChooseScreen";
import { StoreProvider } from "./Store";
import OrderScreen from "./screens/OrderScreen";
import Notice from "./screens/Notice";
import SelectPaymentScreen from "./screens/SelectPaymentScreen";
import CompleteOrderScreen from "./screens/CompleteOrderScreen";
import AdminScreen from "./screens/AdminScreen";

export default function App() {
  return (
    <StoreProvider>
      <div className="screen">
        <Routes>
          <Route index Component={HomeScreen} exact={true} />
          <Route path="/notice" Component={Notice} exact={true} />
          <Route path="/choose" Component={ChooseScreen} exact={true} />
          <Route path="/order" Component={OrderScreen} exact={true}></Route>
          <Route
            path="/selectpayment"
            Component={SelectPaymentScreen}
            exact={true}
          ></Route>
          <Route
            path="/complete"
            Component={CompleteOrderScreen}
            exact={true}
          ></Route>
          <Route path="/admin" Component={AdminScreen} exact={true}></Route>
        </Routes>
      </div>
    </StoreProvider>
  );
}
