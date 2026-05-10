import { motion } from "framer-motion";
import { Vehicle } from "../../types/vehicle";

interface VehicleListProps {

  vehicles: Vehicle[];

  deleteVehicle: (id: number) => void;

}

export default function VehicleList({

  vehicles,

  deleteVehicle,

}: VehicleListProps) {

  return (

    <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">

      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Vehicle Records
      </h2>

      {vehicles.length === 0 ? (

        <p className="text-gray-500">
          No vehicles added yet.
        </p>

      ) : (

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-blue-600 text-white">

              <th className="p-3 text-left">
                Vehicle Number
              </th>

              <th className="p-3 text-left">
                Vehicle Type
              </th>

              <th className="p-3 text-left">
                FASTag ID
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {vehicles.map((vehicle) => (

              <motion.tr

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                  duration: 0.3,
                }}
                key={vehicle.id}
                className="border-b hover:bg-gray-100 transition"
              >

                <td className="p-3 text-gray-800">
                  {vehicle.vehicle_number}
                </td>

                <td className="p-3 text-gray-800">
                  {vehicle.vehicle_type}
                </td>

                <td className="p-3 text-gray-800">
                  {vehicle.fastag_id}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      deleteVehicle(vehicle.id!)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                </td>

              </motion.tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );
}