import React from "react";
const ActionDropdown = ({
  item,
  handleEdit,
  handleDelete,
  setActiveDropdown,
  activeDropdown,
  dropdownRef,
}) => {
  return (
    <div className="">
      <button
        onClick={() =>
          setActiveDropdown(
            activeDropdown === item._id ? null : item._id
          )
        }
        className="p-2 bg-secondary rounded-full hover:bg-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 96 960 960"
          width="24"
          fill="#ffffff"
        >
          <path
            d="M440 936v-100h80v100h-80Zm0-280v-100h80v100h-80Zm0-280v-100h80v100h-80Z"
            stroke-width="2"
          />
        </svg>
      </button>

      {activeDropdown === item._id && (
        <div className="absolute right-14  w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="p-2" role="menu">
            <button
              onClick={() => handleEdit(item._id)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-[#e3e3e3] rounded"
              role="menuitem"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#e3e3e3] rounded"
              role="menuitem"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;