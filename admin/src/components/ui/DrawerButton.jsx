import React, { useState, useRef, useEffect } from "react";
import { PlusCircle, X } from "lucide-react";

const DrawerButton = ({ name, component }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  const handleButtonClick = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

  return (
    <div>
      {/* Trigger Button */}
      <div className="  flex justify-end">
        <button
          className="global-drawer-button"
          onClick={handleButtonClick}
        >
          <span>{name}</span>
          <PlusCircle size={18} />
        </button>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
      )}

      {/* Drawer */}
      {isDrawerOpen && (
        <div
          ref={drawerRef}
          className="fixed right-0 top-0 w-[1000px] h-full bg-white shadow-lg z-20"
        >
          <div className="flex justify-between bg-gray-100 p-2 items-center mt-14">
            <h2 className="text-lg font-semibold">{name}</h2>
            <X
              size={24}
              onClick={handleCloseDrawer}
              className="text-red-500 cursor-pointer"
            />
          </div>
          <div className="p-4">{component}</div>
        </div>
      )}
    </div>
  );
};

export default DrawerButton;
