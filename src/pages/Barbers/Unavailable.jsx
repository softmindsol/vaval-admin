import React, { useEffect, useState } from 'react';
import { Breadcrumb, DefaultLayout, LoadingText } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getBarbers } from '../../store/features/barber/barber.service';

const Unavailable = () => {
  const dispatch = useDispatch();
  const barbers = useSelector(state => state.barber?.data?.barber);
  const isLoading = useSelector(state => state.barber?.isLoading);
  const [selectedBarberId, setSelectedBarberId] = useState('');
  const [currentBarber, setCurrentBarber] = useState(null);

  const handleBarberChange = event => {
    setSelectedBarberId(event.target.value);
  };

  useEffect(() => {
    dispatch(getBarbers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedBarberId) {
      const selectedBarber = barbers?.find(barber => barber._id === selectedBarberId);
      setCurrentBarber(selectedBarber);
    }
  }, [selectedBarberId, barbers]);

  const filterHalfDaySlots = () => {
    if (!currentBarber) return [];

    const fullDayOff = currentBarber.FullDayOff;
    const halfDaySlots = currentBarber.halfDay;

    const filteredHalfDaySlots = halfDaySlots.map((slots, index) => {
      if (index === 0) {
        return slots;
      } else {
        return slots.filter(slot => !fullDayOff.includes(slot.date));
      }
    });

    return filteredHalfDaySlots;
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName='Unavailable Slots' />
      <div className='py-4'>
        <select
          id='subscription_tier'
          onChange={handleBarberChange}
          className='appearance-none border rounded-md text-sm w-[16rem] py-2 px-4 font-medium text-brand leading-tight focus:outline-none focus:shadow-outline capitalize border-gray shadow-1'
        >
          <option disabled value='' selected>
            Select Barber
          </option>
          {barbers?.map(barber => (
            <option key={barber?._id} className='capitalize' value={barber?._id}>
              {barber?.barberName}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <LoadingText />}

      {currentBarber ? (
        <div>
          {currentBarber && (
            <>
              <div className=' p-2'>
                <p className='font-semibold mb-3'>Full Day Off Dates</p>
                <ul className='flex flex-wrap gap-2'>
                  {currentBarber.FullDayOff?.length > 0 ? (
                    <>
                      {currentBarber.FullDayOff?.map(date => (
                        <li key={date} className='mb-2'>
                          <span className='bg-brand/90 text-white px-3 py-1 rounded-md'>
                            {date}
                          </span>
                        </li>
                      ))}
                    </>
                  ) : (
                    <h4>No Full Day Date disable</h4>
                  )}
                </ul>
              </div>
              <div className='p-2'>
                <p className='font-semibold mb-3'>Half Day Off Time slots with Dates</p>
                <ul className='flex flex-wrap gap-5'>
                  {filterHalfDaySlots().map((slots, index) =>
                    slots.map((slot, i) => (
                      <li key={i} className=''>
                        <span className='bg-brand/90 text-white px-3 py-1 rounded-md'>
                          {slot.date} - {slot.startTime} to {slot.endTime}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      ) : (
        <h2 className='text-2xl font-semibold'>
          Please Select Barber to check the disable slots and time
        </h2>
      )}
    </DefaultLayout>
  );
};

export default Unavailable;
