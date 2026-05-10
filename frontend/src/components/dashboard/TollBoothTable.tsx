"use client";

import { useState } from "react";

import { tollData } from "../../utils/tollData";

export default function TollBoothTable() {

  const [selectedState, setSelectedState] =
    useState("Karnataka");

  const filteredTolls = tollData.filter(
    (toll) => toll.state === selectedState
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">

      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Toll Booth Information
      </h2>

      {/* State Dropdown */}

      <select
        value={selectedState}
        onChange={(e) =>
          setSelectedState(e.target.value)
        }
        className="border p-3 rounded-lg text-gray-800 mb-6"
      >

        <option value="Karnataka">
          Karnataka
        </option>

        <option value="Maharashtra">
          Maharashtra
        </option>

        <option value="Tamil Nadu">
          Tamil Nadu
        </option>

        <option value="Telangana">
          Telangana
        </option>

      </select>

      {/* Toll Table */}

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-blue-600 text-white">

            <th className="p-3 text-left">
              Toll Booth
            </th>

            <th className="p-3 text-left">
              Car/Jeep/Van
            </th>

            <th className="p-3 text-left">
              Bus
            </th>

            <th className="p-3 text-left">
              Truck
            </th>

            <th className="p-3 text-left">
              HCV
            </th>

            <th className="p-3 text-left">
              Tractor
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredTolls.map((toll, index) => (

            <tr
              key={index}
              className="border-b hover:bg-gray-100 transition"
            >

              <td className="p-3 text-gray-800">
                {toll.tollName}
              </td>

              <td className="p-3 text-gray-800">
                ₹{toll.carJeepVan}
              </td>

              <td className="p-3 text-gray-800">
                ₹{toll.bus}
              </td>

              <td className="p-3 text-gray-800">
                ₹{toll.truck}
              </td>

              <td className="p-3 text-gray-800">
                ₹{toll.heavyCommercialVehicle}
              </td>

              <td className="p-3 text-gray-800">
                ₹{toll.tractor}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}