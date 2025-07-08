import '../styles/components/header.css';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function HeaderPage({name}) {
  const [inputValue, setInputValue] = useState("");
  const isTyping = inputValue !== "";
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const delText = () => {
    setInputValue("");
  };

  const resSearch = () => {
    if (inputValue.trim() === "") return;
    navigate(`/sidebar?${encodeURIComponent(inputValue)}`);
  };

    return(
        <div className="headerPage">
            <div className="goHomeIcon">
                <Link to='/' className='linkHome'>
                     <div className="logo">
                        <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
                            <g transform="scale(0.35)">
                                <text x="10" y="60" fontFamily="Verdana" fontSize="50" fontWeight="bold" fill="#FF6347">Food</text>
                                <text x="45" y="110" fontFamily="Verdana" fontSize="50" fontWeight="bold" fill="#4CAF50">Map</text>
                            </g>
                        </svg>
                    </div>
                </Link>
            </div>
            <div className="resName">
                <span>{name} </span>
            </div>
            <div className="container searchBox">
                <label htmlFor="searchKeyword" className="screenOut">지도 검색</label>
               <div className="inputWrapper">
                    <input
                        id="searchKeyword"
                        type="text"
                        className="search"
                        placeholder="지도 검색"
                        value={inputValue}
                        onChange={handleChange}
                    />
                    {isTyping && <div className="typing" onClick={delText} />}
                </div>
                 <div className="kakaoIcon search" onClick={resSearch} />
                 </div>
                <div className="btn login" >
                    <Link to='/login'>로그인</Link></div>
                    
        </div>


    )
}