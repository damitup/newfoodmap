export default function MyReview({ data }) {
  console.log(data);
  return (
    <div className="myReview">
      <h4>나의 리뷰</h4>
    
      {/* 리뷰가 없을 경우 */}
      {!Array.isArray(data) || data.length === 0 ? (
        <p className="no-favorite">등록된 리뷰가 없습니다.</p>
      ) : (
        data.map((item, idx) => (
          <div key={item.reviewId || idx} className="section">
            <div className="container title">
              <span className="sectionTitle">{item.resName}</span>
            </div>
            <div className="container title ">
              <p className="reviewContent">{item.reviewContent}</p>
            </div>
              <span className="resType review">
                {item.reviewDate?.slice(0, 16)}
              </span>
          </div>
        ))
      )}
    </div>
  );
} 