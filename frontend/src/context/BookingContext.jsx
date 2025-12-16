import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    hotelId: null,
    roomId: null,
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0,
    extras: [],
  });

  const updateBookingData = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const resetBookingData = () => {
    setBookingData({
      hotelId: null,
      roomId: null,
      checkIn: null,
      checkOut: null,
      adults: 2,
      children: 0,
      extras: [],
    });
  };

  return (
    <BookingContext.Provider
      value={{ bookingData, updateBookingData, resetBookingData }}
    >
      {children}
    </BookingContext.Provider>
  );
};
