"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import { Vehicle } from "../../types/vehicle";

import { getVehicles } from "../../services/vehicleService";

import { tollData } from "../../utils/tollData";

import StatCard from "../../components/dashboard/StatCard";

import {
  FaCar,
  FaList,
  FaMapMarkedAlt,
  FaRoad,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ReportsPage() {

  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);



  /* =========================
     FETCH VEHICLES
  ========================= */

  const fetchVehicles = async () => {

    try {

      const data =
        await getVehicles();

      setVehicles(data);

    } catch (error) {

      console.log(
        "Error fetching vehicles",
        error
      );

    }

  };



  useEffect(() => {

    fetchVehicles();

  }, []);



  /* =========================
     ANALYTICS
  ========================= */

  const vehicleTypeCounts: any = {};

  vehicles.forEach((vehicle) => {

    const type =
      vehicle.vehicle_type;

    vehicleTypeCounts[type] =
      (vehicleTypeCounts[type] || 0) + 1;

  });



  const uniqueVehicleTypes =
    new Set(

      vehicles.map(
        (vehicle) =>
          vehicle.vehicle_type
      )

    ).size;



  const totalStates =
    new Set(

      tollData.map(
        (toll) => toll.state
      )

    ).size;

  const chartData = Object.entries(
    vehicleTypeCounts
  ).map(([type, count]) => ({

    type,

    count,

  }));

  return (

    <main className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-5xl font-bold text-gray-800 mb-10">

            Reports & Analytics

          </h1>



          {/* Analytics Cards */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

            <StatCard
              title="Total Vehicles"
              value={vehicles.length.toString()}
              icon={FaCar}
              color="bg-blue-600"
            />



            <StatCard
              title="Vehicle Categories"
              value={uniqueVehicleTypes.toString()}
              icon={FaList}
              color="bg-green-600"
            />



            <StatCard
              title="States Covered"
              value={totalStates.toString()}
              icon={FaMapMarkedAlt}
              color="bg-purple-600"
            />



            <StatCard
              title="Total Toll Booths"
              value={tollData.length.toString()}
              icon={FaRoad}
              color="bg-orange-500"
            />

          </div>

          {/* Vehicle Analytics Chart */}

          <div className="bg-white p-8 rounded-2xl shadow-md">

            <h2 className="text-3xl font-bold text-gray-700 mb-8">

              Vehicle Analytics Chart

            </h2>

            <div className="w-full h-100">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={chartData}>

                  <XAxis

                    dataKey="type"

                    tick={{
                      fill: "#374151",
                      fontSize: 16,
                      fontWeight: 500,
                    }}

                  />

                  <YAxis />

                  <Tooltip

                    contentStyle={{

                      backgroundColor: "#ffffff",

                      borderRadius: "10px",

                      border: "1px solid #d1d5db",

                      color: "#111827",

                    }}

                    labelStyle={{

                      color: "#111827",

                      fontWeight: "bold",

                    }}

                  />

                  <Bar
                    dataKey="count"
                    fill="#2563eb"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Vehicle Summary */}

          <div className="bg-white p-8 rounded-2xl shadow-md">

            <h2 className="text-3xl font-bold text-gray-700 mb-8">

              Vehicle Type Summary

            </h2>



            <div className="space-y-6">

              {Object.entries(
                vehicleTypeCounts
              ).map(([type, count]) => (

                <div
                  key={type}
                  className="flex justify-between items-center border-b pb-4"
                >

                  <span className="text-2xl text-gray-800">

                    {type}

                  </span>



                  <span className="text-2xl font-bold text-black">

                    {count as number}

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}