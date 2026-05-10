"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import { tollData } from "../../utils/tollData";
import { TollBooth } from "../../types/toll";

export default function TollBoothsPage() {

  const [tolls, setTolls] = useState<TollBooth[]>(() => {

    if (typeof window !== "undefined") {

      const savedTolls =
        localStorage.getItem("tolls");

      return savedTolls
        ? JSON.parse(savedTolls)
        : tollData;
    }

    return tollData;
  });

  useEffect(() => {

    localStorage.setItem(
      "tolls",
      JSON.stringify(tolls)
    );

  }, [tolls]);

  const handleRateChange = (
    index: number,
    field: string,
    value: number
  ) => {

    const updatedTolls = [...tolls];

    updatedTolls[index] = {
      ...updatedTolls[index],
      [field]: value,
    };

    setTolls(updatedTolls);
  };

  return (
    <main className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">

          <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">

            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Toll Booth Management
            </h2>

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-blue-600 text-white">

                  <th className="p-3 text-left">
                    State
                  </th>

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

                {tolls.map((toll, index) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 transition"
                  >

                    <td className="p-3 text-gray-800">
                      {toll.state}
                    </td>

                    <td className="p-3 text-gray-800">
                      {toll.tollName}
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={toll.carJeepVan}
                        onChange={(e) =>
                          handleRateChange(
                            index,
                            "carJeepVan",
                            Number(e.target.value)
                          )
                        }
                        className="border p-2 rounded w-24 text-gray-800"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={toll.bus}
                        onChange={(e) =>
                          handleRateChange(
                            index,
                            "bus",
                            Number(e.target.value)
                          )
                        }
                        className="border p-2 rounded w-24 text-gray-800"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={toll.truck}
                        onChange={(e) =>
                          handleRateChange(
                            index,
                            "truck",
                            Number(e.target.value)
                          )
                        }
                        className="border p-2 rounded w-24 text-gray-800"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={toll.heavyCommercialVehicle}
                        onChange={(e) =>
                          handleRateChange(
                            index,
                            "heavyCommercialVehicle",
                            Number(e.target.value)
                          )
                        }
                        className="border p-2 rounded w-24 text-gray-800"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={toll.tractor}
                        onChange={(e) =>
                          handleRateChange(
                            index,
                            "tractor",
                            Number(e.target.value)
                          )
                        }
                        className="border p-2 rounded w-24 text-gray-800"
                      />
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>
  );
}