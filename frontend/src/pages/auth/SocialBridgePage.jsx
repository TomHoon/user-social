import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

// kakao-2. 브릿지페이지에서 kakao 로그인 요청
export default function SocialBridgePage() {
    const [user , setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {

        const fetchApi = async () => {
            const code = new URL(window.location.href).searchParams.get('code')

            // kakao-3. 카카오 토큰 요청
            const res = await fetch('https://kauth.kakao.com/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
                    redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
                    code: code,
                }),
            });

            const data = await res.json();

            // kakao-4.정보요청
            const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            })

            const data2 = await userResponse.json();
            console.log('data2 >>>>> ', data2);

            setUser(data2);


        }

        fetchApi();
    }, [navigate]);

    return (
        <div>
            {
                user &&
                <>
                    <h1>닉네임: {user.properties.nickname}</h1>
                    <img src={user.properties.profile_image} alt=""/>
                </>
            }

        </div>
    )
}