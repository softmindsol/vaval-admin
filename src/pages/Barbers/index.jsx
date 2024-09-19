import React, { useEffect, useState } from "react";
import {
   Breadcrumb,
   DefaultLayout,
   LoadingText,
   Modal,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { PiNotePencil } from "react-icons/pi";
import Swal from "sweetalert2";
import {
   deleteBarber,
   getBarbers,
   updateBarber,
} from "../../store/features/barber/barber.service";
import { getServices } from "../../store/features/services/services.service";
import { barberForm } from "../../components/data";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { barberSchema } from "../../utils/Schema";

const Barbers = () => {
   const dispatch = useDispatch();
   const barbers = useSelector((state) => state?.barber?.data?.barber);
   const { isLoading } = useSelector((state) => state?.barber);
   const [showModal, setShowModal] = useState(false);
   const [selectedBarber, setSelectedBarber] = useState(null);
   const [selectedSkills, setSelectedSkills] = useState([]);
   const [formValues, setFormValues] = useState({
      barberName: "",
      phone: "",
      email: "",
      address: "",
      experience: "",
      skills: selectedSkills,
   });

   const handleSkillChange = (e) => {
      const selectedSkill = e.target.value;
      if (!selectedSkills.includes(selectedSkill)) {
         const updatedSkills = [...selectedSkills, selectedSkill];
         setSelectedSkills(updatedSkills);
         setFormValues((prevFormValues) => ({
            ...prevFormValues,
            skills: updatedSkills,
         }));
      }
   };

   const handleRemoveSkill = (skill) => {
      setSelectedSkills(
         selectedSkills.filter((selected) => selected !== skill)
      );
   };

   const handleCloseModal = () => {
      setShowModal(false);
   };

   const handleDeleteBarber = (id) => {
      try {
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
               dispatch(deleteBarber(id));
               Swal.fire({
                  title: "Deleted!",
                  text: "Barber deleted successfully",
                  icon: "success",
               });
            }
         });
      } catch (error) {
         console.log(error, "Error while deleting barber");
      }
   };

   const handleEditBarber = (id) => {
      setShowModal(true);
      const barber = barbers.find((barber) => barber._id === id);
      setSelectedBarber(barber);

      setFormValues({
         barberName: barber.barberName,
         phone: barber.phone,
         email: barber.email,
         address: barber.address,
         experience: barber.experience,
         skills: barber.skills,
      });
      setSelectedSkills(barber.skills);
   };

   useEffect(() => {
      dispatch(getBarbers());
      dispatch(getServices());
   }, [dispatch]);

   return (
      <DefaultLayout>
         <Breadcrumb pageName={"All Barbers"} />
         <>
            {isLoading ? (
               <LoadingText />
            ) : (
               <>
                  {barbers && barbers.length > 0 ? (
                     <div className="overflow-auto">
                        <table className="table-auto border-collapse w-full">
                           <thead className="bg-[#d7dade] border-b border-[#dee2e6] text-base w-full">
                              <tr>
                                 <th className=" font-bold p-2 text-nowrap">
                                    Barber Name
                                 </th>
                                 <th className="font-bold p-2 text-nowrap">
                                    Phone
                                 </th>
                                 <th className=" p-2 font-bold text-nowrap">
                                    Skills
                                 </th>
                                 <th className=" p-2 font-bold text-nowrap">
                                    Email
                                 </th>
                                 <th className=" p-2 font-bold text-nowrap">
                                    Address
                                 </th>
                                 <th className=" p-2 font-bold text-nowrap">
                                    Experience
                                 </th>
                                 <th className=" p-2 font-bold text-nowrap">
                                    Actions
                                 </th>
                              </tr>
                           </thead>
                           {barbers?.map((barber) => (
                              <tbody key={barber?._id}>
                                 <tr className="bg-white border-collapse border-b border-gray shadow-1 text-brand text-base font-medium text-center">
                                    <td className=" p-2 text-nowrap truncate">
                                       {barber?.barberName}
                                    </td>
                                    <td className="p-2 text-nowrap truncate">
                                       {barber?.phone}
                                    </td>
                                    <td className="p-2 text-nowrap truncate">
                                       <select className="border rounded-md p-1 capitalize">
                                          {barber?.skills.map((skill) => (
                                             <option
                                                key={skill}
                                                className="capitalize"
                                             >
                                                {skill}
                                             </option>
                                          ))}
                                       </select>
                                    </td>
                                    <td className="p-2 text-nowrap truncate">
                                       {barber?.email}
                                    </td>
                                    <td className="p-2 text-nowrap truncate">
                                       {barber?.address}
                                    </td>
                                    <td className="p-2 text-nowrap truncate">
                                       {barber?.experience > 1
                                          ? `${barber?.experience} years`
                                          : `${barber?.experience} year`}
                                    </td>
                                    <td className="p-2 text-nowrap">
                                       <div className="flex gap-2 items-center justify-center">
                                          <button
                                             title="Edit"
                                             onClick={() =>
                                                handleEditBarber(barber?._id)
                                             }
                                             className="bg-blue-50 text-blue-500 size-7 rounded-full flex items-center justify-center"
                                          >
                                             <PiNotePencil />
                                          </button>
                                          <button
                                             onClick={() =>
                                                handleDeleteBarber(barber?._id)
                                             }
                                             title="Delete"
                                             className="bg-red-50 text-red-500 size-7 rounded-full flex items-center justify-center"
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
                        No barber found
                     </h2>
                  )}
               </>
            )}
         </>

         {showModal && (
            <Modal title={"Edit Barber"} onClose={handleCloseModal}>
               <Formik
                  initialValues={formValues}
                  validationSchema={barberSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                     const payload = {
                        ...values,
                        skills: selectedSkills,
                     };
                     dispatch(
                        updateBarber({
                           id: selectedBarber?._id,
                           data: payload,
                        })
                     )
                        .then(() => {
                           handleCloseModal();
                           Swal.fire({
                              title: "Updated",
                              text: "Barber updated Successfully",
                              icon: "success",
                              timer: 2000,
                           });
                           dispatch(getBarbers());
                        })
                        .catch((error) => {
                           console.log("Error While Update Barber", error);
                           Swal.fire({
                              title: "Opss",
                              text: "Something went wrong",
                              icon: "warning",
                              timer: 2000,
                           });
                        });
                     setSubmitting(false);
                     resetForm();
                  }}
               >
                  {({ isSubmitting }) => (
                     <Form>
                        {barberForm.map((form) => (
                           <div key={form.id} className="mb-1.5">
                              <label htmlFor={form.id}>{form.label}</label>
                              <Field
                                 type={form.type}
                                 name={form.id}
                                 placeholder={form.placeholder}
                                 className="w-full rounded border-[1.5px] border-neutral-2 border-stroke bg-transparent py-2 px-5 text-neutral-1 outline-none transition focus:border-brand active:border-brand disabled:cursor-default disabled:bg-whiter"
                              />
                              <ErrorMessage
                                 name={form.id}
                                 component="div"
                                 className="text-red-500 text-sm"
                              />
                           </div>
                        ))}

                        <div className="mb-1.5">
                           <label htmlFor="skills">Skills</label>
                           <Field
                              as="select"
                              id="skills"
                              name="skills"
                              value={selectedSkills}
                              className="w-full rounded border-[1.5px] border-neutral-2 border-stroke bg-transparent py-2 px-5 text-neutral-1 outline-none transition focus:border-brand active:border-brand disabled:cursor-default disabled:bg-whiter capitalize"
                              onChange={handleSkillChange}
                           >
                              <option value="" disabled>
                                 Select Services
                              </option>
                              {selectedSkills?.map((skill, index) => (
                                 <option
                                    key={index}
                                    value={skill}
                                    className="capitalize"
                                 >
                                    {skill}
                                 </option>
                              ))}
                           </Field>
                           <div className="mt-3 flex flex-wrap gap-2">
                              {selectedSkills.map((skill) => (
                                 <div
                                    key={skill}
                                    className="bg-gray-200 rounded-md px-3 py-1 flex items-center border-brand border-2 capitalize"
                                 >
                                    <span className="mr-1">{skill}</span>
                                    <button
                                       type="button"
                                       onClick={() => handleRemoveSkill(skill)}
                                       className="text-red-500 hover:text-red-700"
                                    >
                                       <MdDelete />
                                    </button>
                                 </div>
                              ))}
                           </div>
                           <ErrorMessage
                              name="skills"
                              component="div"
                              className="text-red-500 text-sm"
                           />
                        </div>
                        <button
                           type="submit"
                           className="text-white bg-brand hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-55 disabled:cursor-not-allowed"
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

export default Barbers;
