import {Link} from 'react-router-dom';

export default function Login() {
    return (
    <div class="loginBackColor">
        <div class="loginPage">
            <div className="title">
                <h1>로그인</h1>        
            </div>
            <div className="loginForm">
                <div className="formGroup">
                   <label for="userId">아이디</label> 
                   <input type="text" id="userId" name="userId" required/>
                </div>
                <div className="formGroup">
                    <label for="password">비밀번호</label> 
                    <input type="password" id="password" name="password" required/>
                </div>
                <div className="formGroup">
                    <button type="submit"  className="btn">로그인</button>
                </div>
                <div className="register-link">
                    계정이 없으신가요? <Link to="/regist">회원가입</Link>
                </div>
            </div>
        </div>
    </div>
    )
}