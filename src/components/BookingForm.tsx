import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface BookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  onSubmit: (data: BookingFormData) => void;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  participants: number;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedDate,
  selectedTime,
  onSubmit
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BookingFormData>();

  // Force re-render when calendar selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      console.log('Selection changed:', window.selectedDate, window.selectedTime);
    };

    window.addEventListener('booking-selection-changed', handleSelectionChange);
    return () => {
      window.removeEventListener('booking-selection-changed', handleSelectionChange);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Selected Date & Time</label>
        <div className="text-gray-600 mb-4">
          {selectedDate?.toLocaleDateString()} {selectedTime}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone
          <input
            type="tel"
            {...register('phone', { required: 'Phone is required' })}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Number of Participants
          <input
            type="number"
            min="1"
            max="6"
            {...register('participants', { 
              required: 'Number of participants is required',
              min: { value: 1, message: 'Minimum 1 participant' },
              max: { value: 6, message: 'Maximum 6 participants' }
            })}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        {errors.participants && <span className="text-red-500 text-xs">{errors.participants.message}</span>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Confirm Booking
      </button>
    </form>
  );
};
