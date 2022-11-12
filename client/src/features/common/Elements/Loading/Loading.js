import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col justify-center items-center w-48 h-24 space-y-6">
        <span className="dots-flow"></span>
        <span className="text-base text-contrast-80">Loading...</span>
      </div>
    </div>
  );
}
