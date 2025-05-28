import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const Drawer = ({ open, onClose, title, children }) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20" aria-hidden="true" />

      {/* Wrap the panel with Dialog.Panel to make outside click work */}
      <div className="fixed inset-y-0 right-0 w-full max-w-5xl">
        <Dialog.Panel className="h-full bg-white shadow-xl  overflow-y-auto">
          {/* Header */}
          <div className="flex bg-gray-100 justify-between items-center  p-2 mb-3">
            <h2 className="text-sm text-black font-semibold ">{title}</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-red-500" />
            </button>
          </div>

          {/* Content */}
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Drawer;
