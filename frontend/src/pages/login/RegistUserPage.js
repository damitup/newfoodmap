import { useState } from "react";

    export default function RegistUserPage() {
        const resetForm = () => {
        const form = document.getElementById("registerid");
        form.reset(); // form 초기화
        };

    return (
        <div className="table_container">
            <form id="registerid" >
                <table className="table">
                        <tr>
                            <th colSpan="3" className="title">회원가입 정보</th>
                        </tr>
                        <tr>
                            <th className="aside">아이디 : </th>
                            <td> 
                                <input type="text" id="userId" name ="id"/>
                                <span className="subMsg">4~12자의 영문 대소문자와 숫자로만 입력</span>
                            </td>
                        </tr>
                        <tr>
                            <th className="aside">비밀번호 : </th>
                            <td><input type="password" id="userPw"/>
                                <span className="subMsg">4~12자의 영문 대소문자와 숫자로만 입력</span>
                            </td>
                        </tr>
                        <tr>
                            <th className="aside"> 비밀번호 확인 : </th>
                            <td> <input type="password" id="userPw2" name="pw"/></td>
                        </tr>
                        <tr>
                            <th className="aside">이름 : </th>
                            <td> <input type="text" id="name" name="name" /></td>
                        </tr>
                       
                        {/* <tr>
                            <th className="aside" >관심분야 : </th>
                            <td> <input type="checkbox" name="interest" value="컴퓨터" /><span className="content">컴퓨터</span>
                                <input type="checkbox" className="content" name="interest" value="인터넷" /><span
                                    className="content">인터넷</span>
                                <input type="checkbox" className="content" name="interest" value="여행" /><span
                                    className="content">여행</span><br/>
                                <input type="checkbox" className="content" name="interest" value="음악감상" /><span
                                    className="content">음악감상</span>
                                    <input type="checkbox" className="content" name="interest" value="영화감상" /><span
                                    className="content">영화감상</span>
                            </td>
                        </tr> */}
                    </table>
                <div className="butBox">
                    <input type="submit" className="button"  value = "회원 가입"/>
                    <input type="button" className="button" value = "다시 입력" onClick={resetForm}/>
                </div>
            </form>
        </div>
        )
    }