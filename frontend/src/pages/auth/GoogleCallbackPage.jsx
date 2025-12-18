import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('token');
      const name = params.get('name');
      const email = params.get('email');

      // 이미 토큰이 저장되어 있으면 중복 실행 방지
      if (token && !localStorage.getItem('accessToken')) {
        localStorage.setItem('accessToken', token);
        const userData = {
          name: name || '사용자',
          email: email || '',
          token: token
        };
        login(userData);
        navigate('/', { replace: true });
      } else if (!token) {
        navigate('/login', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
    // eslint-disable-next-line
  }, []); // 최초 1회만 실행

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>구글 로그인 처리 중...</h2>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
};

export default GoogleCallbackPage;