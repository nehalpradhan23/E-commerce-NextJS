import React from "react";
import { PulseLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <PulseLoader
        color={"#000000"}
        loading={true}
        size={30}
        data-testid="loader"
      />
    </div>
  );
}
