import { Link } from "react-router-dom";
import "./pagination.css";

function CustomPaginationOrder({ pages, idPage, pageName, numberPage }) {
  const num = Number(idPage);

  return (
    <div className="pagination">
      {idPage >= 2 ? (
        <Link to={`/order/${pageName}/page/${idPage - 1}`}>&laquo;</Link>
      ) : (
        <Link to={`/order/${pageName}/page/${1}`}>&laquo;</Link>
      )}

      <Link to={`/order/${pageName}/page/${idPage}`}>{idPage}</Link>

      {numberPage != null ? (
        <Link to={`/order/${pageName}/page/${num + 1}`}>&raquo;</Link>
      ) : (
        <Link to={`/order/${pageName}/page/${pages}`}>&raquo;</Link>
      )}
    </div>
  );
}

export default CustomPaginationOrder;
