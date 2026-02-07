
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRouter;

