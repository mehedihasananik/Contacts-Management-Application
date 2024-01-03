import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <Outlet />
    </div>
  );
};

export default Main;
