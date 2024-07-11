import { Outlet, Route, Routes } from "react-router-dom";
import { allRoutes } from "./allRoutes";
import DefaultTemplate from "../components/DefaultTemplate";

function Template() {
  return (
    <DefaultTemplate>
      <Outlet />
    </DefaultTemplate>
  );
}

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        {allRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}
