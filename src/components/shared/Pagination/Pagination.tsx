import React from 'react';

interface PaginationProps {
	totalItems: number;
	pageSize: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	totalItems,
	pageSize,
	currentPage,
	onPageChange,
}) => {
	const totalPages = Math.ceil(totalItems / pageSize);
	const pages = [];

	for (let i = 1; i <= totalPages; i++) {
		pages.push(i);
	}

	const handlePageClick = (page: number) => {
		onPageChange(page);
	};

	return (
		<nav>
			<ul className="page">
				{pages.map((page) => (
					<li
						key={page}
						className={`page__item ${page === currentPage ? 'page__item_active' : ''}`}
					>
						<button className="page__link" onClick={() => handlePageClick(page)}>
							{page}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
