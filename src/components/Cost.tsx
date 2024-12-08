import React, { useState } from "react";
import { getPackageCost } from "../api";

interface CostProps {
  ariaLabel: string;
}

export default function Cost({ariaLabel}: CostProps): JSX.Element {
  const [packageId, setPackageId] = useState("");
  const [cost, setCost] = useState<number | null>(null);
  const [responseMessage, setResponseMessage] = useState<[string, string] | null>(null);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPackageId(e.target.value);
    setResponseMessage(["", "wait"]); // Clear response message when user starts typing
    setCost(null); // Clear cost when user starts typing
  };

  const handleGetCost = async () => {
    if (!packageId) {
      setResponseMessage(["Please enter a package ID.", "error"]);
      return;
    }

    try {
      // Replace with the actual API endpoint to get the package cost
      const response = await getPackageCost(packageId);
      //   console.log(response);
      if (response) {
        setCost(response);
        // console.log(response);
        setResponseMessage(["Package cost retrieved successfully.", "success"]);
      } else {
        setResponseMessage(["Failed to get the package cost. Please try again.", "error"]);
      }
    } catch {
      setResponseMessage(["An error occurred. Please try again later.", "error"]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGetCost();
    }
  };


  return (
    <div className="min-w-[700px] flex flex-col items-center gap-10" aria-label={ariaLabel}>
      <label className="text-3xl text-white" htmlFor="packageId">
        Get Package Cost by ID
      </label>
      <input
        id="packageId"
        type="text"
        value={packageId}
        onChange={handleIdChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter Package ID"
        className="text-3xl rounded caret-black p-2"
      />
      <button onClick={handleGetCost} className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg">
        Get Package Cost
      </button>
      {responseMessage && (
        <span className={`${responseMessage[1] == "error" ? "text-red-500" : "text-green-500"} mt-2`}>
          {responseMessage[0]}
        </span>
      )}
      {cost !== null && <div className="mt-4 text-3xl text-white">Package Cost: {cost} MB</div>}
    </div>
  );
}
