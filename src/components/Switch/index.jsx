const Switcher = ({ id, checked, onChange }) => {
   return (
      <div className="flex justify-center items-center gap-2">
         <label
            htmlFor={id}
            className="flex cursor-pointer select-none items-center"
         >
            <div className="relative">
               <input
                  type="checkbox"
                  id={id}
                  className="sr-only"
                  onChange={onChange}
                  checked={checked}
               />
               <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
               <div
                  className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                     checked &&
                     "!right-1 !translate-x-full !bg-red-500 dark:!bg-white"
                  }`}
               ></div>
            </div>
         </label>
      </div>
   );
};

export default Switcher;
