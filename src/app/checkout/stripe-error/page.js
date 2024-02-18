import React from "react";

export default function StripeError() {
  return (
    <div className="w-[80%] text-2xl mx-auto text-red-500 min-h-screen flex justify-center items-center">
      Cannot checkout with stripe. According to RBI guidelines individual
      accounts are not allowed to make transactions.
    </div>
  );
}
