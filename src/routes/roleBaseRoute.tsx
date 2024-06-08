import { useAppSelector } from "../hooks/hooke";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";


type RoleRoutes = {
    [key: string]: string;
};

interface RoleBasedRedirectProps {
    roles: RoleRoutes;
}

export const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({ roles }) => {
    const { data }= useAppSelector((state: RootState) => state.user);

    if (!data || !data.data.role || !roles[data.data.role]) {
        return <Navigate to="/home" replace />;
    }
    
    return <Navigate to={roles[data.data.role]} replace />;
};