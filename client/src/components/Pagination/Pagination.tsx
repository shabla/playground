import React, { useMemo } from "react";
import { Row, Button } from "@/components";

import "./Pagination.scss";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxDynamicPages?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
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

  const buttons = useMemo(() => {
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
      let maxPage = totalPages - 2; // -1 because last page is always there, another -1 because we want an index
      let firstDyn = 0, lastDyn = 0;

      if (maxPage <= maxDynamicPages) {
        // we can display all the pages at once
        firstDyn = 1;
        lastDyn = maxPage;

      } else {
        if (currentPage < maxDynamicPages) {
          // current page near the start
          firstDyn = 1;
          lastDyn = maxDynamicPages;

        } else if (currentPage + maxDynamicPages - 1 > maxPage) {
          // current page near the end
          firstDyn = maxPage - maxDynamicPages + 1;
          lastDyn = maxPage;

        } else {
          // current page somewhere in the middle
          firstDyn = currentPage - Math.floor(maxDynamicPages / 2)
          lastDyn = currentPage + Math.floor(maxDynamicPages / 2)
        }
      }

      if (firstDyn > 1) {
        buttons.push('...')
      }

      for (let i = firstDyn; i <= lastDyn; i++) {
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

      if (lastDyn < maxPage) {
        buttons.push('...');
      }

    }

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

    return buttons;
  }, [currentPage, totalPages, maxDynamicPages, onPageChange])

  return (
    <Row className="pagination" align="start center" gap={5}>
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