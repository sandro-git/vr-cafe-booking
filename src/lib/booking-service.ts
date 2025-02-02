import { nanoid } from 'nanoid';

export interface BookingData {
  name: string;
  email: string;
  date: string;
  timeSlot: string;
  numberOfPeople: number;
}

interface Booking extends BookingData {
  id: string;
  createdAt: Date;
  status: 'confirmed' | 'cancelled';
}

// In-memory storage for bookings
const bookings = new Map<string, Booking>();

export async function createBooking(data: BookingData): Promise<Booking> {
  const booking: Booking = {
    ...data,
    id: nanoid(),
    createdAt: new Date(),
    status: 'confirmed'
  };
  
  bookings.set(booking.id, booking);
  return booking;
}

export async function getBooking(id: string): Promise<Booking | null> {
  return bookings.get(id) || null;
}

export async function getBookingsByEmail(email: string): Promise<Booking[]> {
  return Array.from(bookings.values()).filter(booking => booking.email === email);
}
