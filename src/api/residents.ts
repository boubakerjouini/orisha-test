import type { Resident } from '@/types/resident'
import data from '@/assets/data.json'

/**
 * Simulates an async API call to fetch residents.
 * In a real app, this would be an HTTP request.
 * The artificial delay demonstrates loading states with TanStack Query.
 */
export async function fetchResidents(): Promise<Resident[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300))
  return data as Resident[]
}

/**
 * Fetch a single resident by ID.
 */
export async function fetchResidentById(id: string): Promise<Resident | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const residents = data as Resident[]
  return residents.find((r) => r.id === id)
}
