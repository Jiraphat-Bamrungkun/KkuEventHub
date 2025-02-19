import { Link } from "react-router-dom";

function Detail() {
  return (
    <div>
      <h1>หน้ารายละเอียด</h1>
      <p>นี่คือหน้ารายละเอียด</p>
      <Link to="/">กลับไปหน้าโฮม</Link>
    </div>
  );
}

export default Detail;
