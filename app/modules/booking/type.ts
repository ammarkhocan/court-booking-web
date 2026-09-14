export type CreateBookingBody = {
  courtId: string;
  startTime: string;
  endTime: string;
};

export type Booking = {
  id: string;
  userId: string;
  courtId: string;
  startTime: string;
  endTime: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type BookingError = {
  message: string;
};
