import type { Court, CourtAvailability, Courts } from "~/modules/court/type";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export async function getCourts(): Promise<Courts> {
  const response = await fetch(`${API_URL}/courts`);

  if (!response.ok) {
    throw new Response("Failed to fetch courts", {
      status: response.status,
    });
  }

  return response.json();
}

export async function getCourtById(id: string): Promise<Court> {
  const response = await fetch(`${API_URL}/courts/${id}`);

  if (!response.ok) {
    throw new Response("Failed to fetch court detail", {
      status: response.status,
    });
  }

  return response.json();
}

export async function getCourtAvailability(
  id: string,
  date: string,
): Promise<CourtAvailability> {
  const response = await fetch(
    `${API_URL}/courts/${id}/availability?date=${date}`,
  );

  if (!response.ok) {
    throw new Response("Failed to fetch court availability", {
      status: response.status,
    });
  }

  return response.json();
}
