import { Link } from "react-router-dom";
import "./pagination.css";

function CustomPagination({ pages, idPage, pageName }) {
  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }
  const result = range(1, pages);
  const num = Number(idPage);

  return (
    <div className="pagination">
      {idPage >= 2 ? (
        <Link to={`/${pageName}/page/${num - 1}`}>&laquo;</Link>
      ) : (
        <Link to={`/${pageName}/page/${1}`}>&laquo;</Link>
      )}

      {result?.map((piece) => {
        return (
          <Link index={piece + 900} to={`/${pageName}/page/${piece}`}>
            {piece}
          </Link>
        );
      })}

      {idPage < pages ? (
        <Link to={`/${pageName}/page/${num + 1}`}>&raquo;</Link>
      ) : (
        <Link to={`/${pageName}/page/${pages}`}>&raquo;</Link>
      )}
    </div>
  );
}

export default CustomPagination;
