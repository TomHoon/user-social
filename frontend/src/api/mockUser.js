// 임시 사용자 데이터
export const mockUser = {
  id: 1,
  email: "user@test.com",
  password: "1234",
  name: "홍길동",
  phone: "010-1234-5678",
  profileImage: null,
  createdAt: "2025-01-01",
};

// 로그인 인증 함수
export const authenticateUser = (email, password) => {
  if (email === mockUser.email && password === mockUser.password) {
    // 비밀번호는 제외하고 반환
    const { password: _, ...userWithoutPassword } = mockUser;
    return {
      success: true,
      user: userWithoutPassword,
      token: "mock-jwt-token-" + Date.now(),
    };
  }

  return {
    success: false,
    message: "이메일 또는 비밀번호가 올바르지 않습니다.",
  };
};
