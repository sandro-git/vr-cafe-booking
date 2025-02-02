import { db, Booking } from '../../db/config';
import { eq } from 'astro:db';
import { nanoid } from 'nanoid';

export interface BookingData {
  name: string;
  email: string;
  date: string;
  timeSlot: string;
  numberOfPeople: number;
}

export async function createBooking(data: BookingData) {
  try {
    const booking = await db.insert(Booking).values({
      id: nanoid(),
      ...data,
      date: new Date(data.date),
      createdAt: new Date(),
      status: 'confirmed'
    });
    return booking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

export async function getBooking(id: string) {
  try {
    const booking = await db.select().from(Booking).where(eq(Booking.id, id));
    return booking[0];
  } catch (error) {
    console.error('Error getting booking:', error);
    throw error;
  }
}

export async function getBookingsByEmail(email: string) {
  try {
    const bookings = await db.select().from(Booking).where(eq(Booking.email, email));
    return bookings;
  } catch (error) {
    console.error('Error getting bookings by email:', error);
    throw error;
  }
}
