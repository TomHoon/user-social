// backend/config/passport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

// 임시 사용자 저장소 (실제는 MongoDB 모델로 대체해야 함)
const users = new Map(); 

const findOrCreateUser = (profile, provider, done) => {
    const socialId = `${provider}_${profile.id}`;
    
    // 이 부분에서 MongoDB와 연동하여 사용자를 찾고 생성해야 합니다.
    if (users.has(socialId)) {
        return done(null, users.get(socialId));
    }

    const newUser = {
        id: socialId,
        provider: provider,
        email: profile.emails ? profile.emails[0].value : null,
        displayName: profile.displayName || '소셜 사용자',
    };
    users.set(socialId, newUser);
    done(null, newUser);
};

// 세션에 사용자 ID 저장
passport.serializeUser((user, done) => {
    done(null, user.id); 
});

// 세션 ID로 사용자 정보 복원
passport.deserializeUser((id, done) => {
    const user = users.get(id); 
    if (user) {
        done(null, user);
    } else {
        done(new Error('User not found'));
    }
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URI,
}, (accessToken, refreshToken, profile, done) => {
    findOrCreateUser(profile, 'google', done);
}));

// Kakao Strategy
passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    // clientSecret: process.env.KAKAO_CLIENT_SECRET, // 사용할 경우 추가
    callbackURL: process.env.KAKAO_CALLBACK_URI,
}, (accessToken, refreshToken, profile, done) => {
    findOrCreateUser(profile, 'kakao', done);
}));

module.exports = passport;