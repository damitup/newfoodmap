export default function MyReview({ data }) {
  return (
    <div className="myReview">
      <h4>나의 리뷰</h4>
      {data.map((item, idx) => (
        <div key={idx}>
          <p>{item.title}</p>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}