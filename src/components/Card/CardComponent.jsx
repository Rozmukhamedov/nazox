import "./card.css";
import DefaultImage from "../../assets/images/defaultimage.jpg";
import { Link } from "react-router-dom";

function CardComponent({ cardItem }) {
  return (
    <div className="card">
      <img src={cardItem.image ? cardItem.image : DefaultImage} alt="" />
      <Link to={`/restaurants-detail/${cardItem.id}`}>
        <h4>{cardItem.name}</h4>
      </Link>

      <p> Akbar Polatoov</p>
      <hr />
      <div className="card-flex">
        <div className="card-item">
          <p>Products</p>
          <h5>{cardItem.owner}</h5>
        </div>
        <div className="card-item">
          <p>Branches</p>
          <h5>{cardItem.starting_from}</h5>
        </div>
        <div className="card-item">
          <p>Online amount</p>
          <h5>0,0</h5>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
