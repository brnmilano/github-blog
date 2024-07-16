import { Outlet, Route, Routes } from "react-router-dom";
import { allRoutes } from "./allRoutes";
import DefaultTemplate from "../components/DefaultTemplate";
import Blog from "../pages/Blog";

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
        <Route index element={<Blog />} />

        {allRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}
