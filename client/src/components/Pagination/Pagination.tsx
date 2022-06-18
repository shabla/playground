import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Row, Column, Button } from "@/components";

import "./Pagination.scss";

export interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  maxDynamicPages?: number;
  onSetPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  maxDynamicPages = 3,
  onSetPage,
}) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onSetPage(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onSetPage(currentPage + 1);
    }
  }

  const buttons: React.ReactNode[] = [
    <Button
      intent={currentPage === 0 ? "primary" : undefined}
      simple={currentPage !== 0}
      onClick={() => onSetPage(0)}
    >
      1
    </Button>
  ];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
            intent={currentPage === i ? "primary" : undefined}
            simple={currentPage !== i}
            onClick={() => onSetPage(i)}
          >
            {i + 1}
          </Button>
        )
      }

    } else {
      console.log("dyn pages", dynPages)

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
        console.log('offset', offset)

        const page = currentPage + offset;

        buttons.push(
          <Button
            intent={currentPage === page ? "primary" : undefined}
            simple={currentPage !== page}
            onClick={() => onSetPage(page)}
          >
            {page + 1}
          </Button>
        )
      }
    }


  }

  console.log(`
  itemsPerPage: ${itemsPerPage}
  totalItems:   ${totalItems}
  currentPage:  ${currentPage}
  totalPages:   ${totalPages}
  `)

  if (totalPages > 1) {
    buttons.push(
      <Button
        intent={currentPage === totalPages - 1 ? "primary" : undefined}
        simple={currentPage !== totalPages - 1}
        onClick={() => onSetPage(totalPages - 1)}
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