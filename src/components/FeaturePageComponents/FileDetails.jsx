import React from "react";
import { FiX } from "react-icons/fi";

const FileDetails = ({ fileInfo, onRemove }) => {
  return (
    <div className="flex-1 px-4 py-3 text-lg text-center text-[#555555] bg-[#EEEEEE] truncate flex justify-between items-center h-full">
      <div className="truncate bg-[#EEEEEE]">
        <span className="pop font-medium">{fileInfo.name}</span>
        <span className="pop ml-2 text-[#555555]">({fileInfo.size})</span>
      </div>
      <button
        onClick={onRemove}
        className="text-red-600 hover:bg-red-100 rounded-full p-1 ml-4 transition flex items-center justify-center cursor-pointer"
        title="Remove file"
      >
        <FiX className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FileDetails;