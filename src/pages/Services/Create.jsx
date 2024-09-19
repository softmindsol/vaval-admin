import Swal from "sweetalert2";
import { useFormik } from "formik";
import { Breadcrumb, DefaultLayout } from "../../components";
import { ADD_SERVICES } from "../../utils/baseURL";
import { servicesSchema } from "../../utils/Schema";
import { useState } from "react";
import api from "../../utils/Api";

const CreateServices = () => {
   const [loading, setLoading] = useState(false);
   const formik = useFormik({
      initialValues: {
         serviceName: "",
      },
      validationSchema: servicesSchema,
      onSubmit: async (values) => {
         setLoading(true);
         try {
            const response = await api.post(`${ADD_SERVICES}`, values);
            setLoading(false);
            Swal.fire({
               icon: "success",
               title: response.data.message,
               text: "New Service Added",
               timer: 1500,
            });

            formik.resetForm();
         } catch (error) {
            setLoading(false);
            Swal.fire({
               icon: "warning",
               title: "Bad Request",
               text: `${error?.response?.data?.message}`,
            });
            console.error("Error while calling API:", error);
         }
      },
   });

   return (
      <DefaultLayout>
         <Breadcrumb pageName={"Add Services"} />

         <>
            <div className="bg-white shadow-1 rounded-md">
               <form
                  autoComplete="off"
                  onSubmit={formik.handleSubmit}
                  className="p-4 max-w-screen-xl mx-auto"
               >
                  <div className="flex flex-col gap-2 w-full">
                     <label
                        className=" text-secondary text-xs pr-10 font-medium sm:text-sm mb-2"
                        htmlFor="serviceName"
                     >
                        Service
                     </label>
                     <div>
                        <input
                           type="text"
                           id="serviceName"
                           placeholder="Enter your Services"
                           name="serviceName"
                           onChange={formik.handleChange}
                           value={formik.values.serviceName}
                           className="appearance-none border border-slate-200 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-brand w-full"
                        />
                        {formik.touched.serviceName &&
                        formik.errors.serviceName ? (
                           <p className="text-xs text-left mt-1 text-red-500">
                              {formik.errors.serviceName}
                           </p>
                        ) : null}
                     </div>
                  </div>
                  <div className="flex justify-center mt-4 mb-4">
                     <button
                        type="submit"
                        disabled={loading}
                        className="text-white bg-brand hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:opacity-55 disabled:cursor-not-allowed"
                     >
                        {loading ? "Loading..." : "Add Service"}
                     </button>
                  </div>
               </form>
            </div>
         </>
      </DefaultLayout>
   );
};

export default CreateServices;
