import { useState } from "react";
import axios from 'axios';

    export default function RegistUserPage() {
        const [formData, setFormData] = useState({
        userId: '',
        userPassword: '',
        userName: '',
        userTel: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);
            const response = await axios.post(
                                            'http://localhost:8080/api/user/register',
                                            JSON.stringify(formData),
                                            {
                                                headers: {
                                                'Content-Type': 'application/json',
                                                },
                                            }
                                            );

            alert('프론트회원가입 성공!');
            document.getElementById("registerid").reset();
            response.then(res => {
                console.log(res);
                
            })

        } catch (err) {
            if (err.response && err.response.data) {
                alert(`회원가입 실패: ${err.response.data.message || err.response.data}`);
            } else {
                alert('서버와의 연결에 실패했습니다.');
            }
        }
    };

    const resetForm = () => {
        document.getElementById("registerid").reset();
        setFormData({ userId: '', userPassword: '', userName: '',userTel:'' });
    };

    return (
        <div className="table_container">
            <form id="registerid" onSubmit={handleSubmit}>
                <table className="table">
                    <tr>
                        <th colSpan="3" className="title">회원가입 정보</th>
                    </tr>
                    <tr>
                        <th className="aside">아이디 : </th>
                        <td>
                            <input type="text" id="userId" onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th className="aside">비밀번호 : </th>
                        <td>
                            <input type="password" id="userPassword" onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th className="aside">이름 : </th>
                        <td>
                            <input type="text" id="userName" onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th className="aside">전화번호 : </th>
                        <td>
                            <input type="text" id="userTel" onChange={handleChange} />
                        </td>
                    </tr>
                </table>
                <div className="butBox">
                    <input type="submit" className="button" value="회원 가입" />
                    <input type="button" className="button" value="다시 입력" onClick={resetForm} />
                </div>
            </form>
        </div>
    );
}