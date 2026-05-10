"use client";

import { useState } from "react";

import { Vehicle } from "../../types/vehicle";

interface VehicleFormProps {
  addVehicle: (vehicle: Vehicle) => void;
}

export default function VehicleForm({
  addVehicle,
}: VehicleFormProps) {

  const [vehicleNumber, setVehicleNumber] =
    useState("");

  const [vehicleType, setVehicleType] =
    useState("");

  const [fastagId, setFastagId] =
    useState("");



  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      !vehicleNumber ||
      !vehicleType ||
      !fastagId
    ) {
      alert("Please fill all fields");
      return;
    }

    addVehicle({

      vehicle_number: vehicleNumber,

      vehicle_type: vehicleType,

      fastag_id: fastagId,

    });



    setVehicleNumber("");

    setVehicleType("");

    setFastagId("");
  };



  return (

    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Add Vehicle
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* Vehicle Type */}

        <select
          value={vehicleType}
          onChange={(e) =>
            setVehicleType(e.target.value)
          }
          className="w-full border p-4 rounded-lg text-gray-800"
        >

          <option value="">
            Select Vehicle Type
          </option>

          <option value="Car/Jeep/Van">
            Car/Jeep/Van
          </option>

          <option value="Bus">
            Bus
          </option>

          <option value="Truck">
            Truck
          </option>

          <option value="Heavy Commercial Vehicle">
            Heavy Commercial Vehicle
          </option>

          <option value="Tractor">
            Tractor
          </option>

        </select>



        {/* Vehicle Number */}

        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) =>
            setVehicleNumber(e.target.value)
          }
          className="w-full border p-4 rounded-lg text-gray-800 placeholder-gray-500"
        />



        {/* FASTag ID */}

        <input
          type="text"
          placeholder="FASTag ID"
          value={fastagId}
          onChange={(e) =>
            setFastagId(e.target.value)
          }
          className="w-full border p-4 rounded-lg text-gray-800 placeholder-gray-500"
        />



        {/* Submit Button */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Vehicle
        </button>

      </form>

    </div>

  );
}