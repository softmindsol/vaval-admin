import React, { useEffect, useState } from "react";
import { DefaultLayout, Breadcrumb, LoadingText } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../store/features/appointments/appointment.service";
import { updateOrder } from "../../store/features/slots/slots.service";
import Swal from "sweetalert2";
import Switch from "../../components/Switch";

const Appointment = () => {
   const dispatch = useDispatch();
   const appointments = useSelector((state) => state.appointments.data);
   const isLoading = useSelector((state) => state.appointments.isLoading);

   const [checkboxes, setCheckboxes] = useState({});

   useEffect(() => {
      dispatch(getAppointments());
   }, []);

   const handleCheckboxChange = (id) => {
      const updatedCheckboxes = { ...checkboxes, [id]: !checkboxes[id] };
      setCheckboxes(updatedCheckboxes);

      dispatch(
         updateOrder({ id: id, data: { userPresent: updatedCheckboxes[id] } })
      ).then((response) => {
         if (response.payload.status === 200) {
            dispatch(getAppointments());
            Swal.fire({
               title: "Updated",
               text: response?.payload?.data?.message,
               icon: "success",
               timer: 1500,
            });
         }
      });
   };

   return (
      <DefaultLayout>
         <Breadcrumb pageName="Appointment" />
         {isLoading ? (
            <LoadingText />
         ) : (
            <>
               {appointments && appointments.length > 0 ? (
                  <div className="overflow-auto">
                     <table className="table-auto border-collapse w-full">
                        <thead className="bg-[#d7dade] border-b border-[#dee2e6] text-base">
                           <tr>
                              <th className="font-bold p-2 text-nowrap">
                                 Customer Name
                              </th>
                              <th className="font-bold p-2 text-nowrap">
                                 Phone
                              </th>
                              <th className="font-bold p-2 text-nowrap">
                                 Barber Name
                              </th>
                              <th className="p-2 font-bold text-nowrap">
                                 Date
                              </th>
                              <th className="p-2 font-bold text-nowrap">
                                 Time
                              </th>
                              <th className="p-2 font-bold text-nowrap">
                                 Service
                              </th>
                              <th className="p-2 font-bold text-nowrap">
                                 Present/Block
                              </th>
                           </tr>
                        </thead>
                        {appointments.map((appointment) => (
                           <tbody key={appointment._id}>
                              <tr className="bg-white border-collapse border-b border-gray shadow-1 text-brand text-base font-medium text-center">
                                 <td className="p-2 text-nowrap truncate">
                                    {appointment.userName}
                                 </td>
                                 <td className="p-2 text-nowrap truncate">
                                    {appointment.phone}
                                 </td>
                                 <td className="p-2 text-nowrap truncate">
                                    {appointment.chooseBarberName}
                                 </td>
                                 <td className="p-2 text-nowrap truncate">
                                    {appointment.date}
                                 </td>
                                 <td className="p-2 text-nowrap truncate">
                                    {appointment.time}
                                 </td>
                                 <td className="p-2 text-nowrap truncate">
                                    {appointment.service}
                                 </td>
                                 <td className="p-2 text-nowrap truncate text-center">
                                    <Switch
                                       checked={appointment?.userPresent}
                                       onChange={() =>
                                          handleCheckboxChange(appointment._id)
                                       }
                                    />
                                 </td>
                              </tr>
                           </tbody>
                        ))}
                     </table>
                  </div>
               ) : (
                  <h2 className="text-black/75 text-2xl text-center font-bold pb-3 my-3">
                     No Appointment Book yet
                  </h2>
               )}
            </>
         )}
      </DefaultLayout>
   );
};

export default Appointment;
