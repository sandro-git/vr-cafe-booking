import { useState } from 'react';
import { BookingCalendar } from './BookingCalendar';
import { BookingForm } from './BookingForm';

export function BookingContainer() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Select Date & Time</h2>
        <BookingCalendar 
          onTimeSlotSelect={(date, timeSlot) => {
            setSelectedDate(date);
            setSelectedTime(timeSlot);
          }}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Your Details</h2>
        <BookingForm 
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            console.log('Selected date:', selectedDate);
            console.log('Selected time:', selectedTime);
            // Handle form submission here
          }}
        />
      </div>
    </div>
  );
}
