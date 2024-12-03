import React, { useState } from "react";

const Share = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded-lg shadow-md flex items-center justify-between w-48">
      <span>Added</span>
      <button
        onClick={() => setVisible(false)}
        className="text-white ml-4 focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

export default Share;
