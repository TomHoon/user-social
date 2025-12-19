import {useEffect} from "react";

export default function KakaoLoginPage() {

    useEffect(() => {
        // 카카오 SDK 초기화
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY)
            console.log('Kakao SDK 초기화:', window.Kakao.isInitialized())

            window.Kakao.Auth.authorize({
                redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
            });
        }
    }, []);
}