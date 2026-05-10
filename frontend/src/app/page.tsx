"use client";

import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import StatCard from "../components/dashboard/StatCard";
import VehicleForm from "../components/dashboard/VehicleForm";
import VehicleList from "../components/dashboard/VehicleList";

import { Vehicle } from "../types/vehicle";

import { tollData } from "../utils/tollData";

import {
  getVehicles,
  addVehicleAPI,
  deleteVehicleAPI,
} from "../services/vehicleService";

import {
  FaCar,
  FaList,
  FaMapMarkedAlt,
} from "react-icons/fa";

export default function Home() {

  /* =========================
     STATES
  ========================= */

  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filterType, setFilterType] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH VEHICLES
  ========================= */

  const fetchVehicles = async () => {

    try {

      setLoading(true);

      const data =
        await getVehicles();

      setVehicles(data);

    } catch (error) {

      console.log(
        "Error fetching vehicles",
        error
      );

    } finally {

      setLoading(false);

    }

  };



  /* =========================
     LOAD VEHICLES
  ========================= */

  useEffect(() => {

    fetchVehicles();

  }, []);



  /* =========================
     ADD VEHICLE
  ========================= */

  const addVehicle = async (
    vehicle: Vehicle
  ) => {

    try {

      await addVehicleAPI(vehicle);

      fetchVehicles();

    } catch (error) {

      console.log(
        "Error adding vehicle",
        error
      );

    }

  };



  /* =========================
     DELETE VEHICLE
  ========================= */

  const deleteVehicle = async (
    id: number
  ) => {

    try {

      await deleteVehicleAPI(id);

      fetchVehicles();

    } catch (error) {

      console.log(
        "Error deleting vehicle",
        error
      );

    }

  };



  /* =========================
     FILTER VEHICLES
  ========================= */

  const filteredVehicles =
    vehicles.filter((vehicle) => {

      const matchesSearch =

        vehicle.vehicle_number
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesFilter =

        filterType === "" ||

        vehicle.vehicle_type ===
          filterType;

      if (loading) {

        return (

          <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="text-center">

              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

              <h2 className="text-2xl font-bold text-gray-700">

                Loading TollIQ Dashboard...

              </h2>

            </div>

          </div>

        );

      }    

      return (
        matchesSearch &&
        matchesFilter
      );

    });



  /* =========================
     ANALYTICS
  ========================= */

  const uniqueVehicleTypes =
    new Set(

      vehicles.map(
        (vehicle) =>
          vehicle.vehicle_type
      )

    ).size;

  const uniqueStates =
    new Set(

      tollData.map(
        (toll) => toll.state
      )

    ).size;



  return (

    <main className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6 space-y-6">

          {/* Analytics */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <StatCard
              title="Registered Vehicles"
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
              value={uniqueStates.toString()}
              icon={FaMapMarkedAlt}
              color="bg-purple-600"
            />

          </div>



          {/* Search */}

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Search & Filter
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Search Vehicle Number"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                className="border p-3 rounded-lg text-gray-800 placeholder-gray-500"
              />



              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(
                    e.target.value
                  )
                }
                className="border p-3 rounded-lg text-gray-800"
              >

                <option value="">
                  All Vehicle Types
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

            </div>

          </div>



          {/* Vehicle Section */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <VehicleForm
              addVehicle={addVehicle}
            />

            <VehicleList
              vehicles={filteredVehicles}
              deleteVehicle={deleteVehicle}
            />

          </div>

        </div>

      </div>

    </main>

  );

}