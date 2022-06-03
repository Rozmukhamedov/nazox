import { Link } from "react-router-dom";
import "../assets/styles/pagenotfound.css";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import imgError from "../assets/images/error-img.png";

function NotFoundPage() {
  return (
    <div className="not_found">
      <h1 className="not_found_error">
        4
        <span className="error_text">
          0
          <img src={imgError} className="error_img" />
        </span>
        4
      </h1>
      <h3 className="text_uppercase">Sorry, page not found</h3>
      <div className="mt-5 text-center">
        <Link to={"/"}>
          <CustomSmpButton
            text={"Back to Dashboard"}
            cursor={"pointer"}
            color={"#fff"}
            background={"#5664d2"}
            border={"1px solid #5664d2"}
            padding={"10px 20px"}
            borderRadius={"5px"}
            margin={"20px 0 0 0"}
          />
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
