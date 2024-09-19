import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Switch } from "@headlessui/react";
import Multiselect from "multiselect-react-dropdown";
import { Breadcrumb, DefaultLayout } from "../../components";
import { ADD_HOLIDAYS } from "../../utils/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { getBarbers } from "../../store/features/barber/barber.service";
import api from "../../utils/Api";
import { disableTomorrow, timeArray } from "../../utils/timeFormat";

function classNames(...classes) {
   return classes.filter(Boolean).join(" ");
}

const SlotManagement = () => {
   const dispatch = useDispatch();
   const barbers = useSelector((state) => state.barber?.data?.barber);
   const [enabledStates, setEnabledStates] = useState(false);
   const [selectedBarberId, setSelectedBarberId] = useState("");
   const [selectedDate, setSelectedDate] = useState("");
   const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      dispatch(getBarbers());
   }, [dispatch]);

   const handleToggleChange = () => {
      setEnabledStates(!enabledStates);
      setSelectedDate("");
   };

   const handleBarberChange = (event) => {
      setSelectedBarberId(event.target.value);
   };

   const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
   };

   const handleTimeSlotSelect = (selectedList, selectedItem) => {
      setSelectedTimeSlots(selectedList);
   };

   const handleSetSlot = () => {
      if (!selectedBarberId) {
         Swal.fire({
            icon: "warning",
            title: "Please select a barber",
            showConfirmButton: false,
            timer: 1500,
         });
         return;
      }

      if (!selectedDate) {
         Swal.fire({
            icon: "warning",
            title: "Please choose a date",
            showConfirmButton: false,
            timer: 1500,
         });
         return;
      }

      if (!enabledStates) {
         if (selectedTimeSlots.length < 1) {
            Swal.fire({
               icon: "warning",
               title: "Please Select at least one time slot",
               showConfirmButton: false,
               timer: 1500,
            });
            return;
         }
      }

      const requestBody = {
         fullDayOff: enabledStates ? selectedDate : undefined,
         halfDay: selectedTimeSlots.map((slot) => ({
            startTime: slot.startTime,
            endTime: slot.endTime,
            date: selectedDate,
         })),
      };

      setLoading(true);
      api.post(`${ADD_HOLIDAYS}/${selectedBarberId}`, requestBody)
         .then((response) => {
            Swal.fire({
               icon: "success",
               title: response.data.message,
               showConfirmButton: false,
               timer: 1500,
            });
            setLoading(false);
            setSelectedDate("");
            setSelectedTimeSlots([]);
         })
         .catch((error) => {
            console.error("Error setting slot:", error);
            Swal.fire({
               icon: "error",
               title: "Something went wrong",
               showConfirmButton: false,
               timer: 1500,
            });
         });
   };

   return (
      <DefaultLayout>
         <Breadcrumb pageName={"Slot Management"} />
         <div className="my-6">
            <h2 className="text-brand font-semibold text-lg pb-3">
               Please choose a time slot you wish to deactivate for the barber
            </h2>
         </div>

         <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="w-full mb-4">
               <select
                  onChange={handleBarberChange}
                  className="border border-brand rounded-md w-full p-2"
               >
                  <option disabled value="" selected>
                     Select doctor
                  </option>
                  {barbers?.map((barber) => (
                     <option
                        key={barber?._id}
                        className="capitalize"
                        value={barber?._id}
                     >
                        {barber?.barberName}
                     </option>
                  ))}
               </select>
            </div>

            <div className="mb-4 flex flex-col">
               <label htmlFor="" className="mb-2 font-semibold">
                  Enable / Disable for the whole day
               </label>
               <Switch
                  checked={enabledStates}
                  onChange={handleToggleChange}
                  className={classNames(
                     enabledStates ? "bg-slate-300" : "bg-blue-500",
                     "relative inline-flex h-4 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  )}
               >
                  <span className="sr-only">Use setting</span>
                  <span
                     aria-hidden="true"
                     className={classNames(
                        enabledStates ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                     )}
                  />
               </Switch>
            </div>

            <div className="flex flex-col gap-2 mb-4">
               <label htmlFor="date">Select Date</label>
               <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={disableTomorrow()}
                  className="border border-brand p-2 rounded-md"
               />
            </div>

            <div className="mb-4">
               <label htmlFor="" className="mb-2">
                  Select Slots
               </label>
               {enabledStates ? (
                  <p className="text-base font-medium text-black-2">
                     Whole Day Off on this Date
                  </p>
               ) : (
                  <Multiselect
                     isObject={true}
                     placeholder="Select unavailable Slots"
                     displayValue="label"
                     onSelect={handleTimeSlotSelect}
                     options={timeArray}
                     disable={enabledStates}
                     selectedValues={selectedTimeSlots}
                     className="border border-brand rounded-md w-full"
                  />
               )}
            </div>

            <button
               type="button"
               onClick={handleSetSlot}
               disabled={loading}
               className="w-full bg-brand font-medium h-10 rounded-md text-white disabled:opacity-55 disabled:cursor-not-allowed"
            >
               {loading ? "Loading..." : "Add Slot"}
            </button>
         </div>
      </DefaultLayout>
   );
};

export default SlotManagement;
