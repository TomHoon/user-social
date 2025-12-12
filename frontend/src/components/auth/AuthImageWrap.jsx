
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

const images = [
  "https://images.unsplash.com/photo-1596386461350-326ccb383e9f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://cdn.pixabay.com/photo/2022/04/26/13/14/background-7158357_1280.jpg",
  "https://virtual-bg.com/wp-content/uploads/2020/06/modern-home-7-background-for-zoom-or-teams-unsplash.jpg"
];

const AuthImageWrap = () => {
  return (
    <div className="login-image-section">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="hotel-image-wrapper"
              style={{
                width: "100%",
                height: "100%",
                background: `url(${src}) center center / cover no-repeat`
              }}
            >
              {/* <img
                src={src}
                alt={`Hotel ${idx + 1}`}
                className="hotel-image"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0 }}
              /> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AuthImageWrap;
