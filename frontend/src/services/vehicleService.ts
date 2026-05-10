import axios from "axios";

const API_URL =
  "https://tolliq-backend.onrender.com"

/* =========================
   GET VEHICLES
========================= */

export const getVehicles = async () => {

  const response =
    await axios.get(API_URL);

  return response.data;
};



/* =========================
   ADD VEHICLE
========================= */

export const addVehicleAPI =
  async (vehicle: any) => {

    const response =
      await axios.post(
        API_URL,
        vehicle
      );

    return response.data;
};



/* =========================
   DELETE VEHICLE
========================= */

export const deleteVehicleAPI =
  async (id: number) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`
      );

    return response.data;
};