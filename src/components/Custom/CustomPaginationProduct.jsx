import { Link } from "react-router-dom";
import "./pagination.css";

function CustomPaginationProduct({ pages, idPage, pageName, idCategory }) {
  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }
  const result = range(1, pages);
  const num = Number(idPage);

  return (
    <div className="pagination">
      {idPage >= 2 && pageName == "product" ? (
        <Link to={`/${pageName}/${idCategory}/page/${num - 1}`}>&laquo;</Link>
      ) : (
        <Link to={`/${pageName}/${idCategory}/page/${1}`}>&laquo;</Link>
      )}

      {result?.map((piece, index) => {
        return (
          <Link to={`/${pageName}/${idCategory}/page/${piece}`}>{piece}</Link>
        );
      })}
      {idPage < pages && pageName == "product" ? (
        <Link to={`/${pageName}/${idCategory}/page/${num + 1}`}>&raquo;</Link>
      ) : (
        <Link to={`/${pageName}/${idCategory}/page/${pages}`}>&raquo;</Link>
      )}
    </div>
  );
}

export default CustomPaginationProduct;
