import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/route/ProtectedRoute";
import PublicRoute from "./components/route/PublicRoute";
import Layout from "./hoc/Layout";
import routes from "./routes/routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((item) => {
          const { id, path, element } = item;
          if (id === 1) {
            <Route key={id} index element={element} />;
          } else if (item.protected) {
            return (
              <Route
                key={id}
                path={path}
                element={<ProtectedRoute>{element}</ProtectedRoute>}
              />
            );
          } else if (item.public) {
            return (
              <Route
                key={id}
                path={path}
                element={<PublicRoute>{element}</PublicRoute>}
              />
            );
          }
          return <Route key={id} path={path} element={element} />;
        })}
      </Route>
    </Routes>
  );
}

export default App;
