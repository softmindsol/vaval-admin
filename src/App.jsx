import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import Appointment from "./pages/Appointment";
import AddBarbers from "./pages/Barbers/AddBarber";
import Barber from "./pages/Barbers";

import SlotManagement from "./pages/SlotManagement";
import Services from "./pages/Services";
import CreateServices from "./pages/Services/Create";
import SignIn from "./pages/auth/SignIn";
import ProtectRoute from "./components/ProtectedRoute";
import Unavailable from "./pages/Barbers/Unavailable";
import NotFound from "./pages/NotFound";
import TableOne from "./components/TableOne/TableOne";

const App = () => {
   const [loading, setLoading] = useState(true);
   const { pathname } = useLocation();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);

   useEffect(() => {
      setTimeout(() => setLoading(false), 1000);
   }, []);

   const protectedRoutes = [
      {
         path: `/appointment`,
         element: <Appointment />,
      },
      {
         path: `/barber/all-barbers`,
         element: <Barber />,
      },
      {
         path: `/barber/add-barber`,
         element: <AddBarbers />,
      },
      {
         path: `/barber/unavailable`,
         element: <Unavailable />,
      },
      {
         path: `/services/all`,
         element: <Services />,
      },
      {
         path: `/services/create`,
         element: <CreateServices />,
      },
      {
         path: `/slot/set`,
         element: <SlotManagement />,
      },
      {
         path: `/subscribers`,
         element: <TableOne />,
      },
   ];

   return loading ? (
      <Loader />
   ) : (
      <>
         <Routes>
            <Route path="/" element={<SignIn />} />

            <Route element={<ProtectRoute />}>
               {protectedRoutes?.map((route, index) => {
                  return (
                     <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                     />
                  );
               })}
            </Route>

            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
};

export default App;
