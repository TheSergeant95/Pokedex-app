import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../../../utils/usePagination';
import './Pagination.scss';

interface PaginationProps {
	totalItems: number;
	siblingCount?: number;
	pageSize: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	className: string;
}

const Pagination: React.FC<PaginationProps> = ({
	totalItems,
	siblingCount = 2,
	pageSize,
	currentPage,
	onPageChange,
	className,
}) => {
	const paginationRange = usePagination({
		currentPage,
		totalItems,
		siblingCount,
		pageSize,
	});

	if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(
			currentPage === paginationRange[paginationRange.length - 1] ? currentPage : currentPage + 1,
		);
	};

	const onPrevious = () => {
		onPageChange(currentPage === 1 ? currentPage : currentPage - 1);
	};

	const lastPage = paginationRange[paginationRange.length - 1];

	return (
		<ul className={classnames('pagination__container', { [className]: className })}>
			<li
				className={`pagination__item ${currentPage === 1 ? 'pagination__item_disabled' : ''}`}
				onClick={onPrevious}
			>
				<div className="pagination__item-arrow-left">{'<'}</div>
			</li>
			{paginationRange.map((pageNumber, index) => {
				if (pageNumber === DOTS || typeof pageNumber === 'string') {
					return (
						<li key={`pagination__item-${index}`} className="pagination__item-dots">
							&#8230;
						</li>
					);
				}

				return (
					<li
						key={`pagination__item-${index}`}
						className={`pagination__item ${
							pageNumber === currentPage ? 'pagination__item_selected' : ''
						}`}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</li>
				);
			})}
			<li
				className={`pagination__item ${
					currentPage === lastPage ? 'pagination__item_disabled' : ''
				}`}
				onClick={onNext}
			>
				<div className="pagination__item-arrow-right">{'>'}</div>
			</li>
		</ul>
	);
};

export default Pagination;
