import * as yup from 'yup';

const servicesSchema = yup.object({
  serviceName: yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Service Name must contain only letters")
    .required("Please Enter Service Name"),
})

const barberSchema = yup.object({
  barberName: yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Barber name should only contain alphabetic characters')
    .required('Barber name is required'),
  phone: yup.string()
    .required("Please Enter Your Phone number")
    .matches(/^\d+$/, "Phone number can only contain digits"),
  address: yup.string().required("Please Enter Your Address"),
  email: yup.string().required("Please Enter Your Email").email('Invalid Email Pattern'),
  experience: yup.string()
    .required('Please enter your experience')
    .matches(/^[0-9]+$/, 'Experience must contain numbers only'),
  skills: yup.array()
    .of(yup.string())
    .required("Please choose Your Skills")
    .min(1, "Please choose at least one skill"),
})

const signInSchema = yup.object({
  email: yup.string().required("Email is required").email('Invalid Email Pattern'),
  password: yup.string().required("Password is required"),
})

const slotSchema = yup.object().shape({
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string()
    .required("End time is required")
    .test(
      "is-greater",
      "End time must be after start time",
      function (endTime) {
        const { startTime } = this.parent;
        if (!startTime || !endTime) return true;
        return new Date("1970-01-01 " + startTime) <
          new Date("1970-01-01 " + endTime)
          ? true
          : false;
      }
    ),
  date: yup.date().required("Date is required"),
  fullDayOff: yup.boolean()
})

export {
  servicesSchema,
  barberSchema, signInSchema, slotSchema
};
