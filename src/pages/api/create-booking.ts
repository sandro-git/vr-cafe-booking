import type { APIContext } from 'astro';
import { createBooking } from '../../lib/booking-service';

export async function POST({ request }: APIContext) {
  try {
    if (!request.body) {
      throw new Error('Request body is empty');
    }

    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Content-Type must be application/json');
    }

    const data = await request.json();
    console.log('Received data:', data);

    const { name, email, date, timeSlot, numberOfPeople } = data;

    // Validate input
    if (!name || !email || !date || !timeSlot || !numberOfPeople) {
      return new Response(JSON.stringify({
        message: 'Missing required fields',
        receivedData: data
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Create booking in new booking service
    const booking = await createBooking({
      name,
      email,
      date,
      timeSlot,
      numberOfPeople
    });

    return new Response(JSON.stringify({
      message: 'Booking created successfully',
      booking
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(JSON.stringify({
      message: 'Error creating booking',
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
