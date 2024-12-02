import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const generatePageNumbers = () => {
        const pages = [];

        pages.push(
            <button
                key={1}
                onClick={() => onPageChange(1)}
                className={currentPage === 1 ? "active" : ""}
            >
                1
            </button>
        );

        if (totalPages > 10) {
            for (let i = 2; i <= 7; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={currentPage === i ? "active" : ""}
                    >
                        {i}
                    </button>
                );
            }

            pages.push(<span key="ellipsis">...</span>);

            pages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={currentPage === totalPages ? "active" : ""}
                >
                    {totalPages}
                </button>
            );
        } else {
            for (let i = 2; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={currentPage === i ? "active" : ""}
                    >
                        {i}
                    </button>
                );
            }
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {generatePageNumbers()}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
