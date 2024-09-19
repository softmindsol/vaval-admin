import { IoClose } from "react-icons/io5";

const Modal = ({ title, children, onClose }) => {
   return (
      <div className="bg-black/30 min-h-screen w-full fixed inset-0 z-99 flex items-center justify-center overflow-y-auto">
         <div className="max-w-screen-sm bg-white shadow-1 w-full rounded-sm p-4 z-[999999] m-2.5">
            <div className="flex items-center justify-between py-2 border-b border-slate-200 mb-2">
               <h4 className="text-lg font-semibold text-brand">{title}</h4>
               <div className="text-2xl cursor-pointer" onClick={onClose}>
                  <IoClose />
               </div>
            </div>
            <div className="py-1">{children}</div>
         </div>
      </div>
   );
};

export default Modal;
