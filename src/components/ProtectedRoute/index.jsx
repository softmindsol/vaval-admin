import { useLocation, Navigate, Outlet } from "react-router-dom";
const ProtectRoute = ({ allowedRoles, children }) => {
   // const user = useSelector((state) => state?.auth?.user);

   const token = localStorage.getItem("token");
   const location = useLocation();
   // const userRole = user;
   // const isRoleAllowed = allowedRoles.includes(userRole);
   return token ? (
      <Outlet>{children}</Outlet>
   ) : (
      <Navigate to="/" state={{ from: location }} replace />
   );
};
export default ProtectRoute;
