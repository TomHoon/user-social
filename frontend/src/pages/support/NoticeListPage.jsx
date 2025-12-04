import React from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/support/NoticeListPage.scss";

const NoticeListPage = () => {
 const notices = [
  {
   id: 1,
   category: "공지",
   title: "설 연휴 고객센터 운영 안내",
   date: "2025-01-15",
   isNew: true,
  },
  {
   id: 2,
   category: "이벤트",
   title: "결제 수단 추가 기념 10% 할인 이벤트",
   date: "2025-01-10",
   isNew: true,
  },
  {
   id: 3,
   category: "시스템",
   title: "모바일 앱 업데이트 안내 (v2.5.0)",
   date: "2025-01-05",
   isNew: false,
  },
  {
   id: 4,
   category: "공지",
   title: "예약 취소 수수료 정책 변경 안내",
   date: "2024-12-28",
   isNew: false,
  },
  {
   id: 5,
   category: "이벤트",
   title: "신규 회원 가입 특별 포인트 지급 이벤트",
   date: "2024-12-20",
   isNew: false,
  },
  {
   id: 6,
   category: "공지",
   title: "개인정보 처리방침 변경 안내",
   date: "2024-12-15",
   isNew: false,
  },
  {
   id: 7,
   category: "시스템",
   title: "서비스 점검 안내 (12월 10일)",
   date: "2024-12-08",
   isNew: false,
  },
  {
   id: 8,
   category: "이벤트",
   title: "결제와이 처음이시라면 10% 할인",
   date: "2024-12-01",
   isNew: false,
  },
 ];

 return (
  <div className="notice-list-page">
   <div className="notice-header">
    <h1>공지사항</h1>
    <p>중요한 소식과 업데이트 내용을 확인하세요</p>
   </div>

   <div className="notice-list">
    <table>
     <thead>
      <tr>
       <th>분류</th>
       <th>제목</th>
       <th>등록일</th>
      </tr>
     </thead>
     <tbody>
      {notices.map((notice) => (
       <tr key={notice.id}>
        <td>
         <span className="category-badge">{notice.category}</span>
        </td>
        <td>
         <Link to={`/support/notices/${notice.id}`} className="notice-title">
          {notice.title}
          {notice.isNew && <span className="new-badge">NEW</span>}
         </Link>
        </td>
        <td className="notice-date">{notice.date}</td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default NoticeListPage;
