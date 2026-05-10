"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import Sidebar from "../components/layout/Sidebar";
import StatCard from "../components/dashboard/StatCard";
import VehicleForm from "../components/dashboard/VehicleForm";
import VehicleList from "../components/dashboard/VehicleList";

import { Car, List, MapPin } from "lucide-react";

import {
  getVehicles,
  addVehicleAPI,
  deleteVehicleAPI,
} from "../services/vehicleService";

export default function DashboardPage() {

  const router = useRouter();

  const [vehicles, setVehicles] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [filterType, setFilterType] =
    useState("");



  /* =========================
     AUTH CHECK
  ========================= */

  useEffect(() => {

    const auth =
      Cookies.get("auth");

    if (!auth) {

      router.push("/login");

    }

  }, [router]);



  /* =========================
     FETCH VEHICLES
  ========================= */

  useEffect(() => {

    fetchVehicles();

  }, []);



  const fetchVehicles = async () => {

    try {

      const data =
        await getVehicles();

      setVehicles(data);

    } catch (error) {

      console.error(
        "Error fetching vehicles:",
        error
      );

    }

  };



  /* =========================
     ADD VEHICLE
  ========================= */

  const handleAddVehicle =
    async (vehicle: any) => {

      try {

        await addVehicleAPI(
          vehicle
        );

        fetchVehicles();

      } catch (error) {

        console.error(
          "Error adding vehicle:",
          error
        );

      }

  };



  /* =========================
     DELETE VEHICLE
  ========================= */

  const handleDeleteVehicle =
    async (id: number) => {

      try {

        await deleteVehicleAPI(
          id
        );

        fetchVehicles();

      } catch (error) {

        console.error(
          "Error deleting vehicle:",
          error
        );

      }

  };



  /* =========================
     FILTER VEHICLES
  ========================= */

  const filteredVehicles =
    vehicles.filter(
      (vehicle: any) => {

        const matchesSearch =

          vehicle.vehicle_number
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );



        const matchesType =

          filterType === "" ||

          vehicle.vehicle_type
            .toLowerCase() ===
          filterType.toLowerCase();



        return (
          matchesSearch &&
          matchesType
        );

      }
    );



  /* =========================
     VEHICLE TYPES
  ========================= */

  const vehicleTypes = [

    ...new Set(

      vehicles.map(
        (vehicle: any) =>
          vehicle.vehicle_type
      )

    ),

  ];



  return (

    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-950 text-white">

      {/* Sidebar */}

      <Sidebar />



      {/* Main Content */}

      <div className="flex-1 backdrop-blur-sm">

        {/* Header */}

        <div className="bg-white/10 backdrop-blur-xl border-b border-white/10 px-10 py-6 flex justify-between items-center sticky top-0 z-50">

          <h1 className="text-3xl font-bold text-white">

            Dashboard

          </h1>



          {/* Logout Button */}

          <button
            onClick={() => {

              Cookies.remove(
                "auth"
              );

              window.location.href =
                "/login";

            }}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
          >

            Logout

          </button>

        </div>



        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">

          <StatCard
            title="Registered Vehicles"
            value={
              vehicles.length.toString()
            }
            icon={Car}
            color="bg-cyan-500"
          />



          <StatCard
            title="Vehicle Categories"
            value={
              vehicleTypes.length.toString()
            }
            icon={List}
            color="bg-pink-500"
          />



          <StatCard
            title="States Covered"
            value="3"
            icon={MapPin}
            color="bg-purple-500"
          />

        </div>



        {/* Search & Filter */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 mx-8 p-8 rounded-3xl shadow-2xl mb-8">

          <h2 className="text-2xl font-bold mb-8 text-white">

            Search & Filter

          </h2>



          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Search */}

            <input
              type="text"
              placeholder="Search Vehicle Number"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="border border-white/20 bg-white/10 p-4 rounded-xl text-lg text-white placeholder-gray-300 outline-none focus:border-cyan-400"
            />



            {/* Filter */}

            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(
                  e.target.value
                )
              }
              className="border border-white/20 bg-white/10 p-4 rounded-xl text-lg text-white outline-none focus:border-cyan-400"
            >

              <option value="">
                All Vehicle Types
              </option>



              {vehicleTypes.map(
                (
                  type: any,
                  index
                ) => (

                  <option
                    key={index}
                    value={type}
                    className="text-black"
                  >

                    {type}

                  </option>

                )
              )}

            </select>

          </div>

        </div>



        {/* Vehicle Form + List */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 px-8 pb-10">

          {/* Vehicle Form */}

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">

            <VehicleForm
              addVehicle={
                handleAddVehicle
              }
            />

          </div>



          {/* Vehicle List */}

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl overflow-x-auto">

            <VehicleList
              vehicles={
                filteredVehicles
              }
              deleteVehicle={
                handleDeleteVehicle
              }
            />

          </div>

        </div>

      </div>

    </div>

  );

}