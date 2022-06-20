import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Row, Column, Button } from "@/components";

import "./Pagination.scss";

export interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  maxDynamicPages?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  maxDynamicPages = 3,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  const buttons: React.ReactNode[] = [
    // First button always displayed
    <Button
      key={1}
      intent={currentPage === 0 ? "primary" : undefined}
      simple={currentPage !== 0}
      onClick={() => onPageChange(0)}
    >
      1
    </Button>
  ];

  if (totalPages > 2) {
    let dynPages = totalPages - 2;

    if (dynPages > maxDynamicPages) {
      dynPages = maxDynamicPages;
    }

    if (dynPages < maxDynamicPages) {
      let firstDynPage = 1;
      let lastDynPage = totalPages - 1;

      for (let i = firstDynPage; i < lastDynPage; i++) {
        buttons.push(
          <Button
            key={i + 1}
            intent={currentPage === i ? "primary" : undefined}
            simple={currentPage !== i}
            onClick={() => onPageChange(i)}
          >
            {i + 1}
          </Button>
        )
      }

    } else {
      // console.log("dyn pages", dynPages)

      // TODO: this is broken
      const half = Math.floor(dynPages / 2);

      let leftOffset = 0;
      if (currentPage - half < 1) {
        leftOffset = 1;
      }

      let rightOffset = 0;
      if (currentPage + half > totalPages - 1) {
        rightOffset = totalPages - 1;
      }

      for (let offset = leftOffset; offset <= rightOffset; offset++) {
        const page = currentPage + offset;

        buttons.push(
          <Button
            key={page + 1}
            intent={currentPage === page ? "primary" : undefined}
            simple={currentPage !== page}
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </Button>
        )
      }
    }
  }

  // console.log(`
  // itemsPerPage: ${itemsPerPage}
  // totalItems:   ${totalItems}
  // currentPage:  ${currentPage}
  // totalPages:   ${totalPages}
  // `)

  if (totalPages > 1) {
    // If we have more than 1 page, last page button is always displayed
    const lastPageIndex = totalPages - 1;
    buttons.push(
      <Button
        key={totalPages}
        intent={currentPage === lastPageIndex ? "primary" : undefined}
        simple={currentPage !== lastPageIndex}
        onClick={() => onPageChange(lastPageIndex)}
      >
        {totalPages}
      </Button>
    )
  }

  return (
    <Row className="pagination" gap={5}>
      <Button
        icon="chevron-left"
        onClick={handlePrevious}
        disabled={currentPage === 0}
      />

      {buttons}

      <Button
        icon="chevron-right"
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
      />
    </Row>
  )
}