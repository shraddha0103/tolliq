"use client";

import Sidebar from "../../components/layout/Sidebar";
import Cookies from "js-cookie";

const tollBooths = [

  {
    name: "Bangalore Toll Plaza",
    state: "Karnataka",

    prices: {
      "Car/Jeep/Van": 80,
      Bus: 150,
      Truck: 200,
      "Heavy Commercial Vehicle": 250,
      Tractor: 120,
    },
  },

  {
    name: "Mumbai Express Toll",
    state: "Maharashtra",

    prices: {
      "Car/Jeep/Van": 100,
      Bus: 180,
      Truck: 240,
      "Heavy Commercial Vehicle": 300,
      Tractor: 140,
    },
  },

  {
    name: "Hyderabad Highway Toll",
    state: "Telangana",

    prices: {
      "Car/Jeep/Van": 90,
      Bus: 160,
      Truck: 220,
      "Heavy Commercial Vehicle": 280,
      Tractor: 130,
    },
  },

];

export default function TollBoothsPage() {

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-950 text-white">

      <Sidebar />

      <div className="flex-1">

        {/* Header */}

        <div className="bg-white/10 backdrop-blur-xl border-b border-white/10 px-10 py-6 flex justify-between items-center sticky top-0 z-50">

          <h1 className="text-3xl font-bold text-white">

            Toll Booth Management

          </h1>

          <button
            onClick={() => {

              Cookies.remove("auth");

              window.location.href =
                "/login";

            }}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
          >

            Logout

          </button>

        </div>

        {/* Content */}

        <div className="p-8 space-y-8">

          {tollBooths.map(
            (toll, index) => (

              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8"
              >

                <h2 className="text-2xl font-bold text-cyan-300 mb-2">

                  {toll.name}

                </h2>

                <p className="text-gray-300 mb-8">

                  {toll.state}

                </p>

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>

                      <tr className="bg-white/10 text-white">

                        <th className="p-4 text-left rounded-l-xl">

                          Vehicle Type

                        </th>

                        <th className="p-4 text-left rounded-r-xl">

                          Toll Price (₹)

                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {Object.entries(
                        toll.prices
                      ).map(
                        (
                          [
                            vehicleType,
                            rate,
                          ],
                          idx
                        ) => (

                          <tr
                            key={idx}
                            className="border-b border-white/10"
                          >

                            <td className="p-4 text-white">

                              {vehicleType}

                            </td>

                            <td className="p-4 text-cyan-300 font-semibold">

                              ₹ {rate}

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}