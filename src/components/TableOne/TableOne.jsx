import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchNewsletters } from '../../store/features/newsletter/newsletterSlice';

const TableOne = () => {
  const dispatch = useDispatch();

  // Get the state from Redux store
  const { loading, error } = useSelector(
    (state) => state?.newsletter
  );
  const userData = useSelector(
    (state) => state?.newsletter?.data?.newsletters
  );

  // Dispatch the API call when the component is mounted
  useEffect(() => {
    dispatch(fetchNewsletters());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DefaultLayout>   
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Subscribers
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
            <div className="p-2.5 xl:p-5 text-center">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Phone No.
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Username
              </h5>
            </div>
          </div>

          {userData?.map((user, key) => (
            <div
              className={`grid grid-cols-3 ${
                key === userData.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.email}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.phone}</p>
              </div>

              <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.first_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TableOne;
