import React, { useEffect, useState } from "react";
import {
   Breadcrumb,
   DefaultLayout,
   InputBox,
   LoadingText,
   Modal,
} from "../../components";
import { PiNotePencil } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
   deleteService,
   getServices,
   updateService,
} from "../../store/features/services/services.service";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { servicesSchema } from "../../utils/Schema";

const Services = () => {
   const dispatch = useDispatch();
   const services = useSelector((state) => state?.service?.servicesData?.data);
   const { isLoading, message } = useSelector((state) => state?.service);
   const [showModal, setShowModal] = useState(false);
   const [selectedService, setSelectedService] = useState(null);

   const handleCloseModal = () => {
      setShowModal(false);
   };

   const handleDeleteService = (id) => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
      }).then((result) => {
         if (result.isConfirmed) {
            dispatch(deleteService(id));
            Swal.fire({
               title: "Deleted!",
               text: "Service deleted successfully",
               icon: "success",
            });
         }
      });
   };

   const handleEditService = (id) => {
      const service = services.find((service) => service._id === id);
      setSelectedService(service);
      setShowModal(true);
   };

   useEffect(() => {
      dispatch(getServices());
   }, [dispatch]);

   return (
      <DefaultLayout>
         <Breadcrumb pageName={"All Services"} />
         {isLoading ? (
            <LoadingText />
         ) : (
            <>
               {services && services.length > 0 ? (
                  <div className="overflow-auto">
                     <table className="table-auto border-collapse w-full">
                        <thead className="bg-[#d7dade] border-b border-[#dee2e6] text-base w-full">
                           <tr>
                              <th className=" font-bold p-2 text-nowrap">
                                 Sr No.
                              </th>
                              <th className="font-bold p-2 text-nowrap">
                                 Service
                              </th>
                              <th className=" p-2 font-bold text-nowrap">
                                 Actions
                              </th>
                           </tr>
                        </thead>
                        {services?.map((service, index) => (
                           <tbody key={service?._id}>
                              <tr className="bg-white border-collapse border-b border-gray shadow-1 text-brand text-base font-medium text-center">
                                 <td className=" p-2 text-nowrap truncate">
                                    {index + 1}
                                 </td>
                                 <td className="p-2 text-nowrap truncate capitalize">
                                    {service?.serviceName}
                                 </td>
                                 <td className="p-2 text-nowrap">
                                    <div className="flex gap-2 items-center justify-center">
                                       <button
                                          title="Edit"
                                          onClick={() =>
                                             handleEditService(service?._id)
                                          }
                                          className="bg-blue-50 text-blue-500 size-7 rounded-full flex items-center justify-center"
                                       >
                                          <PiNotePencil />
                                       </button>
                                       <button
                                          title="Delete"
                                          className="bg-red-50 text-red-500 size-7 rounded-full flex items-center justify-center"
                                          onClick={() =>
                                             handleDeleteService(service?._id)
                                          }
                                       >
                                          <MdDelete />
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           </tbody>
                        ))}
                     </table>
                  </div>
               ) : (
                  <h2 className="text-black/75 text-2xl text-center font-bold pb-3 my-3">
                     No services found
                  </h2>
               )}
            </>
         )}
         {showModal && (
            <Modal title={"Edit Services"} onClose={handleCloseModal}>
               <Formik
                  initialValues={{
                     serviceName: selectedService
                        ? selectedService.serviceName
                        : "",
                  }}
                  validationSchema={servicesSchema}
                  onSubmit={async (values) => {
                     try {
                        await dispatch(
                           updateService({
                              id: selectedService?._id,
                              data: values,
                           })
                        );
                        handleCloseModal();
                        Swal.fire({
                           title: "Updated",
                           text: message,
                           icon: "success",
                           showCloseButton: true,
                        });
                        dispatch(getServices());
                     } catch (error) {
                        console.error("Error while calling API:", error);
                     }
                  }}
               >
                  {({ isSubmitting }) => (
                     <Form>
                        <Field
                           type="text"
                           placeholder="Enter Services"
                           label="Service Name"
                           id="serviceName"
                           name="serviceName"
                           as={InputBox}
                        />
                        <ErrorMessage
                           name="serviceName"
                           component="p"
                           className="text-xs text-left mt-1 text-red-500"
                        />
                        <button
                           type="submit"
                           className="mt-3 text-white bg-brand hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-55 disabled:cursor-not-allowed"
                           disabled={isLoading}
                        >
                           {isLoading ? "Loading..." : "Update"}
                        </button>
                     </Form>
                  )}
               </Formik>
            </Modal>
         )}
      </DefaultLayout>
   );
};

export default Services;
