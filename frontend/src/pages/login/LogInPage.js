import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {UserLogin} from "../../api/user/userLogin";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
    const [formData, setFormData] = useState({
        userId: '',
        userPassword: ''
    });


    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData(prev =>({...prev, [id]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);
            const response = await UserLogin(formData);
            if (response.status === 200) {
                alert("로그인 성공");
                navigate(from);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                alert(`로그인 실패: ${err.response.data.message || err.response.data}`);
            } else {
                alert('서버와의 연결에 실패했습니다.');
            }
        }
    };

    return (
        <div className="loginBackColor">
            <div className="loginPage">
                <div className="title">
                    <h1>로그인</h1>
                </div>
                <form onSubmit={handleSubmit} className="loginForm">
                    <div className="formGroup">
                        <label htmlFor="userId">아이디</label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            required
                            value={formData.userId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="userPassword">비밀번호</label>
                        <input
                            type="password"
                            id="userPassword"
                            name="userPassword"
                            required
                            value={formData.userPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <button type="submit" className="btn">로그인</button>
                    </div>
                    <div className="register-link">
                        계정이 없으신가요? <Link to="/regist">회원가입</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
