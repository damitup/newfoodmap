export default function MyReview({ data }) {
  return (
    <div className="myReview">
      <h4>나의 리뷰</h4>
      {!data || data.length === 0 ? (
        <p className="no-favorite">등록된 리뷰가 없습니다.</p>
      ) : (data.map((item, idx) => (
        <div key={idx}>
          <p>{item.title}</p>
          <p>{item.content}</p>
        </div>
      ))
    )}
    </div>
  );
}