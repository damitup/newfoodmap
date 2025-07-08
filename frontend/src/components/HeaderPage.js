import '../styles/components/header.css';
import { Link } from 'react-router-dom';
export default function HeaderPage(){

    return(
        <div className="headerPage">
            <div className="goHomeIcon">
                <Link to='/' className='linkHome'>
                     <div className="logo">
                        <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
                            <text x="10" y="35" fontFamily="Verdana" fontSize="24" fontWeight="bold" fill="#FF6347">Food</text>
                            <text x="80" y="35" fontFamily="Verdana" fontSize="24" fontWeight="bold" fill="#4CAF50">map</text>
                        </svg>
                    </div>
                </Link>
            </div>
            <div className="resName">
                <span> </span>
            </div>
            <div>
                <input type="text" placeholder="지도 검색"/>
                <div className="icon search"/>
            </div>
                <input type="button" value="로그인"/>
        </div>


    )
}