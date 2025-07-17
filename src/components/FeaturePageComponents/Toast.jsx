import React, { useEffect } from "react";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 bg-[#2A3BFF] text-[#EEEEEE] px-6 py-3 rounded-lg shadow-lg z-50 pop transition-all">
      {message}
    </div>
  );
};

export default Toast;