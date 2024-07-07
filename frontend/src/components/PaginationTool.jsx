const Pagination = ({ urlsPerPage, totalUrls, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalUrls / urlsPerPage);
  const maxPageButtons = 5; 

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  const goToFirstPage = () => paginate(1);
  const goToLastPage = () => paginate(totalPages);

  return (
    <nav>
      <ul style={styles.pagination}>
        <li style={styles.pageItem}>
          <button
            onClick={goToFirstPage}
            style={styles.pageLink}
            disabled={currentPage === 1}
          >
            First
          </button>
        </li>
        <li style={styles.pageItem}>
          <button
            onClick={() => paginate(currentPage - 1)}
            style={styles.pageLink}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        {visiblePages.map(number => (
          <li
            key={number}
            style={styles.pageItem}
            className={number === currentPage ? 'active' : ''}
          >
            <button
              onClick={() => paginate(number)}
              style={{
                ...styles.pageLink,
                ...(number === currentPage ? styles.pageLinkActive : {}),
              }}
            >
              {number}
            </button>
          </li>
        ))}
        <li style={styles.pageItem}>
          <button
            onClick={() => paginate(currentPage + 1)}
            style={styles.pageLink}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
        <li style={styles.pageItem}>
          <button
            onClick={goToLastPage}
            style={styles.pageLink}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
    flexWrap: 'wrap',
  },
  pageItem: {
    margin: '0 5px',
  },
  pageLink: {
    border: '1px solid #007bff',
    padding: '5px 10px',
    textDecoration: 'none',
    color: '#007bff',
    cursor: 'pointer',
    backgroundColor: '#fff',
    marginBottom: '5px',
  },
  pageLinkActive: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderColor: '#007bff',
  },
};

export default Pagination;
