import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { closeIcon } from "../../images";
import { ADD_BARBER } from "../../utils/baseURL";
import { Breadcrumb, DefaultLayout } from "../../components";
import { barberSchema } from "../../utils/Schema";
import api from "../../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../store/features/services/services.service";

const AddBarbers = () => {
   const dispatch = useDispatch();
   const services = useSelector((state) => state?.service?.servicesData.data);
   const [selectedServices, setSelectedServices] = useState([]);
   const [barberServices, setBarberServices] = useState();
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      formik.setValues({
         ...formik.values,
         skills: selectedServices,
      });
   }, [selectedServices]);

   useEffect(() => {
      dispatch(getServices());
      setBarberServices(services?.data);
   }, []);

   const handleSelectChange = (event) => {
      const { value } = event.target;
      if (!selectedServices.includes(value)) {
         setSelectedServices([...selectedServices, value]);
      }
   };

   const handleRemoveService = (serviceToRemove, event) => {
      event.preventDefault();
      setSelectedServices(
         selectedServices.filter((service) => service !== serviceToRemove)
      );
   };
   const formik = useFormik({
      initialValues: {
         barberName: "",
         phone: "",
         address: "",
         email: "",
         experience: "",
         skills: [],
      },
      validationSchema: barberSchema,
      onSubmit: async (values) => {
         setLoading(true);
         try {
            const response = await api.post(`${ADD_BARBER}`, values);
            setLoading(false);
            Swal.fire({
               icon: "success",
               title: response.data.message,
               showConfirmButton: false,
               timer: 1500,
            });

            formik.resetForm();
            setSelectedServices([]);
         } catch (error) {
            setLoading(false);
            Swal.fire({
               icon: "error",
               title: "Oops...",
               text: `${error?.response?.data?.message}`,
            });
            console.error("Error while calling API:", error);
         }
      },
   });
   return (
      <DefaultLayout>
         <Breadcrumb pageName={"Add Barber"} />

         <>
            <div className="bg-white shadow-1 rounded-md">
               <form
                  autoComplete="off"
                  onSubmit={formik.handleSubmit}
                  className="pt-8 p-4 max-w-screen-xl mx-auto"
               >
                  <div className="flex flex-col gap-4 lg:flex-row w-full mb-4.5">
                     <div className="flex flex-col gap-2 w-full">
                        <label
                           className=" text-secondary text-sm font-medium sm:text-sm"
                           htmlFor="barberName"
                        >
                           Name
                        </label>
                        <div>
                           <input
                              type="text"
                              id="barberName"
                              placeholder="Enter Name"
                              name="barberName"
                              onChange={formik.handleChange}
                              value={formik.values.barberName}
                              className="appearance-none border border-slate-200 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-brand w-full"
                           />
                           {formik.touched.barberName &&
                           formik.errors.barberName ? (
                              <p className="text-xs text-left mt-1 text-red-500">
                                 {formik.errors.barberName}
                              </p>
                           ) : null}
                        </div>
                     </div>
                     <div className="flex flex-col gap-2 w-full">
                        <label
                           className="text-secondary text-xs font-medium sm:text-sm"
                           htmlFor="phone"
                        >
                           Enter Phone number
                        </label>
                        <div>
                           <input
                              type="number"
                              id="phone"
                              placeholder="Phone no..."
                              name="phone"
                              onChange={formik.handleChange}
                              value={formik.values.phone}
                              className="appearance-none border border-slate-200 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-brand w-full"
                           />
                           {formik.touched.phone && formik.errors.phone ? (
                              <p className="text-xs text-left mt-1 text-red-500">
                                 {formik.errors.phone}
                              </p>
                           ) : null}
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col gap-4 lg:flex-row w-full mb-4.5">
                     <div className="flex flex-col gap-2 w-full">
                        <label
                           className=" text-secondary text-xs font-medium sm:text-sm"
                           htmlFor="address"
                        >
                           Address
                        </label>
                        <div>
                           <input
                              type="text"
                              id="address"
                              placeholder="Enter Address..."
                              name="address"
                              onChange={formik.handleChange}
                              value={formik.values.address}
                              className="appearance-none border border-slate-200 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-brand w-full"
                           />
                           {formik.touched.address && formik.errors.address ? (
                              <p className="text-xs text-left mt-1 text-red-500">
                                 {formik.errors.address}
                              </p>
                           ) : null}
                        </div>
                     </div>
                     <div className="flex flex-col gap-2 w-full">
                        <label
                           className=" text-secondary text-xs font-medium sm:text-sm"
                           htmlFor="email"
                        >
                           Email
                        </label>
                        <div>
                           <input
                              type="email"
                              id="email"
                              placeholder="Enter Email"
                              name="email"
                              onChange={formik.handleChange}
                              value={formik.values.email}
                              className="appearance-none border border-slate-200 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-brand w-full"
                           />
                           {formik.touched.email && formik.errors.email ? (
                              <p className="text-xs text-left mt-1 text-red-500">
                                 {formik.errors.email}
                              </p>
                           ) : null}
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full mb-4.5">
                     <label
                        className=" text-secondary text-xs font-medium sm:text-sm flex items-center"
                        htmlFor="experience"
                     >
                        Experience
                     </label>
                     <div>
                        <input
                           type="number"
                           id="experience"
                           placeholder="Enter Experience"
                           name="experience"
                           onChange={formik.handleChange}
                           value={formik.values.experience}
                           className="appearance-none border border-slate-200 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-brand w-full"
                        />
                        {formik.touched.experience &&
                        formik.errors.experience ? (
                           <p className="text-xs text-left mt-1 text-red-500">
                              {formik.errors.experience}
                           </p>
                        ) : null}
                     </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full mb-4.5">
                     <label
                        className=" text-secondary text-xs font-medium sm:text-sm  flex items-center"
                        htmlFor="skills"
                     >
                        Select Services
                     </label>
                     <div>
                        <select
                           id="skills"
                           name="skills"
                           // value={selectedServices}
                           defaultValue={selectedServices}
                           onChange={handleSelectChange}
                           className="appearance-none border border-slate-200 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-brand w-full capitalize"
                        >
                           <option disabled selected>
                              Select Service
                           </option>
                           {services?.map((service) => (
                              <option
                                 key={service._id}
                                 className="capitalize"
                                 value={service.serviceName}
                              >
                                 {service.serviceName}
                              </option>
                           ))}
                        </select>

                        {formik.touched.skills && formik.errors.skills ? (
                           <p className="text-xs text-left mt-1 text-red-500">
                              {formik.errors.skills}
                           </p>
                        ) : null}
                     </div>
                  </div>

                  <div className="mx-16">
                     {selectedServices.map((service, index) => (
                        <div
                           key={index}
                           className="inline-block mx-2 mb-2 bg-inherit p-2 border rounded relative"
                        >
                           {service}
                           <button
                              className="ml-2 text-red-500"
                              onClick={(event) =>
                                 handleRemoveService(service, event)
                              }
                           >
                              <img
                                 src={closeIcon}
                                 alt="Close Icon"
                                 className="absolute top-[-4px] right-[-4px] bg-danger size-5 p-1 rounded-full border border-black"
                              />
                           </button>
                        </div>
                     ))}
                  </div>

                  <div className="flex justify-center mt-4">
                     <button
                        type="submit"
                        disabled={loading}
                        className="text-white bg-brand hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:opacity-55 disabled:cursor-not-allowed"
                     >
                        {loading ? "Loading..." : "Add Barber"}
                     </button>
                  </div>
               </form>
            </div>
         </>
      </DefaultLayout>
   );
};

export default AddBarbers;
