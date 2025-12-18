import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    // URL 해시에서 토큰 정보 추출 (#token=...&name=...&email=...)
    const hash = location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1)); // # 제거
      const token = params.get('token');
      const name = params.get('name');
      const email = params.get('email');

      if (token) {
        // 토큰 저장
        localStorage.setItem('accessToken', token);
        
        // 사용자 정보 저장
        const userData = {
          name: name || '사용자',
          email: email || '',
          token: token
        };
        
        login(userData);
        
        // 홈으로 리다이렉트
        navigate('/', { replace: true });
      } else {
        // 토큰이 없으면 로그인 페이지로
        navigate('/login', { replace: true });
      }
    } else {
      // 해시가 없으면 로그인 페이지로
      navigate('/login', { replace: true });
    }
  }, [location, navigate, login]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>카카오 로그인 처리 중...</h2>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
};

export default KakaoCallbackPage;