import React from "react";

export default function Button({ children }) {
  return (
    <button className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
      {children}
    </button>
  );
}
