import React, { useState, useEffect } from "react";
import MyProfile from "../../components/mypage/MyProfile";
import "../../styles/pages/mypage/MyBookingsPage.scss";
import { useBooking } from "../../context/BookingContext";
import { getMyReservations } from "../../api/reservationClient";
import { format } from "date-fns";
import {getHotelDetail} from "../../api/hotelClient";

const MyBookingsPage = () => {
  const [filter, setFilter] = useState("upcoming");
  const { bookingData } = useBooking();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getMyReservations();
        console.log("Fetched reservations:", response);

        // 예약 데이터를 UI 형식에 맞게 변환
        const formattedBookings = (response.data || []).map((reservation) => {
          const checkInDate = new Date(reservation.checkIn);
          const checkOutDate = new Date(reservation.checkOut);
          const now = new Date();

          // 상태 판단: upcoming(예정), past(지난), cancelled(취소됨)
          let status = "upcoming";
          if (reservation.status === "cancelled") {
            status = "cancelled";
          } else if (checkOutDate < now) {
            status = "past";
          }

          return {
            id: reservation._id || reservation.id,
            hotelName: reservation.hotelId?.name || "호텔",
            hotelImage:
              reservation.hotelId?.images?.[0] || "/hotel-placeholder.jpg",
            roomName: reservation.roomId?.name || "객실",
            checkIn: {
              date: format(checkInDate, "EEE, MMM d"),
              time: "12:00pm",
            },
            checkOut: {
              date: format(checkOutDate, "EEE, MMM d"),
              time: "11:30am",
            },
            status: status,
            totalPrice: reservation.totalPrice,
            guestCount: reservation.guestCount,
          };
        });

        setBookings(formattedBookings);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
        setBookings([]);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const filteredBookings = bookings.filter(
    (booking) => booking.status === filter
  );

  console.log("Total bookings:", bookings.length);
  console.log("Filtered bookings:", filteredBookings.length);
  console.log("Current filter:", filter);

  if (loading) {
    return (
      <div className="bookings-page">
        <div className="bookings-content">
          <div className="loading">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <div className="bookings-content">
        <div className="bookings-header">
          <h2 className="bookings-title">예약내역</h2>
          <div className="filter-buttons">
            <button
              className={`btn filter-btn ${filter === "upcoming" ? "active" : ""}`}
              onClick={() => setFilter("upcoming")}
            >
              신규
            </button>
            <button
              className={`btn filter-btn ${filter === "past" ? "active" : ""}`}
              onClick={() => setFilter("past")}
            >
              이력
            </button>
            <button
              className={`btn filter-btn ${filter === "cancelled" ? "active" : ""}`}
              onClick={() => setFilter("cancelled")}
            >
              취소됨
            </button>
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="empty-bookings">
            <p>예약 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="bookings-list">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-image">
                  {booking.hotelImage ? (
                    <img src={booking.hotelImage} alt={booking.hotelName} />
                  ) : (
                    <div className="image-placeholder">
                      <span>{booking.hotelName}</span>
                    </div>
                  )}
                </div>

                <div className="booking-info">
                  <h3>{booking.hotelName}</h3>
                  <p>{booking.roomName}</p>
                </div>

                <div className="booking-details">
                  <div className="detail-group">
                    <label>Check-in</label>
                    <div className="date">{booking.checkIn.date}</div>
                    <div className="time-group">
                      <span className="time-label">체크인</span>
                      <span className="time">{booking.checkIn.time}</span>
                    </div>
                  </div>

                  <div className="divider">~</div>

                  <div className="detail-group">
                    <label>Check-Out</label>
                    <div className="date">{booking.checkOut.date}</div>
                    <div className="time-group">
                      <span className="time-label">체크아웃</span>
                      <span className="time">{booking.checkOut.time}</span>
                    </div>
                  </div>

                  <div className="status-group">
                    <div className="status-item">
                      <span className="status-dot arrival"></span>
                      <div>
                        <div className="status-label">체크인</div>
                        <div className="status-value">On arrival</div>
                      </div>
                    </div>
                    <div className="status-item">
                      <span className="status-dot departure"></span>
                      <div>
                        <div className="status-label">체크아웃</div>
                        <div className="status-value">On arrival</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="booking-actions">
                  <button className="btn-download">Download Ticket</button>
                  <button className="btn-detail">›</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
