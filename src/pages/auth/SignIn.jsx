import { bgImage, brandLogo } from '../../images';
import { InputBox } from '../../components';
import { useFormik } from 'formik';
import { signInSchema } from '../../utils/Schema';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/features/auth/auth.service';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(state => state.auth);
  
  const formInputs = [
    {
      id: 1,
      type: 'email',
      placeholder: 'Enter Email',
      label: 'Email Address',
      name: 'email',
    },
    {
      id: 2,
      type: 'password',
      placeholder: 'Enter Password',
      label: 'Password',
      name: 'password',
    },
  ];

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Form values:', values); // Debugging info
  
      dispatch(login(values))
        .unwrap()
        .then((response) => {
          console.log('Login response:', response); // Debugging info
          
          Swal.fire({
            title: 'Success',
            text: 'Logged in successfully!',
            icon: 'success',
            timer: 2000,
          });
          resetForm();
          navigate('/subscribers'); // Redirect to dashboard or any protected route
        })
        .catch((error) => {
          console.error('Login error:', error); // Debugging info
          // Handle login error (Swal for error is already shown in API)
        });
    },
  });
  
  return (
    <div >
      <section className="bg-banner">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img className="w-28 md:w-40 mr-2" src={brandLogo} alt="brandLogo" />
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-brand md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-3" onSubmit={formik.handleSubmit}>
                {formInputs.map(input => (
                  <div key={input.id}>
                    <InputBox
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      label={input.label}
                      name={input.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[input.name]}
                    />
                    {formik.touched[input.name] && formik.errors[input.name] ? (
                      <small className="text-red-500 text-xs">
                        {formik.errors[input.name]}
                      </small>
                    ) : null}
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white bg-brand focus:ring-4 focus:outline-none focus:ring-brand/35 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-55 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Loadinjhmhjg...' : 'Sibghgn in'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
