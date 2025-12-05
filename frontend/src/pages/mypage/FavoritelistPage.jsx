import React from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/mypage/WishListPage.scss";
import { useFavorites } from "../../context/FavoritesContext";

const FavoritelistPage = () => {
  const { favorites, loading, removeFavoriteItem } = useFavorites();

  if (loading) {
    return (
      <section className="wish-container">
        <div className="inner">
          <div className="loading">로딩 중...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="wish-container">
      <div className="inner">
        <div className="section-header">
          <div className="tit">
            <h2 className="section-title">위시리스트</h2>
            <p className="section-subtitle">
              내가 찜한 호텔을 한눈에 확인하고, 특별한 혜택과 함께 예약하세요.
            </p>
          </div>
          <div className="favorites-count">
            총 <strong>{favorites.length}</strong>개의 호텔
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-icon">❤️</div>
            <h3>저장된 호텔이 없습니다</h3>
            <p>마음에 드는 호텔을 찜해보세요!</p>
            <Link to="/search" className="btn-primary">
              호텔 둘러보기
            </Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((f) => (
              <div key={f.id} className="favorites-card">
                <div className="card-image">
                  <img src={f.hotelId?.images?.[0]} alt={f.hotelId?.name} />
                  <button
                    className="btn-remove-favorites"
                    onClick={() => removeFavoriteItem(f.id || f._id)}
                    aria-label="위시리스트에서 제거"
                  >
                    ❤️
                  </button>
                  <div className="card-tags">
                    {f.hotelId?.tags?.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <h3 className="hotel-name">{f.hotelId?.name}</h3>
                    <div className="hotel-rating">
                      <span className="rating-score">
                        ⭐ {f.hotelId?.ratingAverage}
                      </span>
                      <span className="review-count">
                        ({f.hotelId?.ratingCount})
                      </span>
                    </div>
                  </div>

                  <p className="hotel-location">📍 {f.hotelId?.location}</p>

                  <div className="card-footer">
                    <div className="price-info">
                      <span className="price-label">1박</span>
                      <span className="price-amount">
                        {f.hotelId?.basePrice?.toLocaleString()}원
                      </span>
                    </div>
                    <Link
                      to={`/hotel/${f.hotelId?._id}`}
                      className="btn-view-detail"
                    >
                      상세보기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritelistPage;
