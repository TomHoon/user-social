import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../styles/pages/support/NoticeDetailPage.scss';

const NoticeDetailPage = () => {
  const { noticeId } = useParams();

  // 임시 데이터
  const notice = {
    id: noticeId,
    category: '공지',
    title: '설 연휴 고객센터 운영 안내',
    date: '2025-01-15',
    views: 1234,
    content: `
      <p>안녕하세요, W-HOTEL입니다.</p>
      
      <p>설 연휴 기간 동안 고객센터 운영 시간이 변경됩니다.</p>
      
      <h3>운영 시간 안내</h3>
      <ul>
        <li><strong>1월 28일(화):</strong> 정상 운영 (09:00 - 18:00)</li>
        <li><strong>1월 29일(수) ~ 2월 2일(일):</strong> 휴무</li>
        <li><strong>2월 3일(월):</strong> 정상 운영 재개</li>
      </ul>
      
      <h3>긴급 문의</h3>
      <p>연휴 기간 중 긴급한 문의사항은 이메일(support@w-hotel.com)로 남겨주시면 순차적으로 답변 드리겠습니다.</p>
      
      <h3>예약 변경 및 취소</h3>
      <p>예약 변경 및 취소는 홈페이지 마이페이지에서 24시간 가능합니다.</p>
      
      <p>고객님의 양해 부탁드리며, 즐거운 연휴 보내시기 바랍니다.</p>
      
      <p>감사합니다.</p>
    `
  };

  return (
    <div className="notice-detail-page">
      <div className="notice-header">
        <span className="category-badge">{notice.category}</span>
        <h1>{notice.title}</h1>
        <div className="notice-meta">
          <span className="date">{notice.date}</span>
          <span className="divider">|</span>
          <span className="views">조회 {notice.views}</span>
        </div>
      </div>

      <div className="notice-content" dangerouslySetInnerHTML={{ __html: notice.content }} />

      <div className="notice-footer">
        <Link to="/support/notices" className="back-btn">
          목록으로
        </Link>
      </div>
    </div>
  );
};

export default NoticeDetailPage;