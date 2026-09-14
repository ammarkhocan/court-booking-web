import Cookies from "js-cookie";
import type { Booking, BookingError, CreateBookingBody } from "./type";

export async function createBooking(body: CreateBookingBody): Promise<Booking> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Silakan login terlebih dahulu.");
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const error: BookingError = await response.json();

    throw new Error(error.message);
  }

  return response.json();
}

export async function getBookings(): Promise<Booking[]> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Silakan login terlebih dahulu.");
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/bookings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil booking history.");
  }

  return response.json();
}

export async function getBookingById(id: string): Promise<Booking> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Silakan login terlebih dahulu.");
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/bookings/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil detail booking.");
  }

  return response.json();
}
