import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

function PageSelect({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (event) => {
    const inputPage = parseInt(event.target.value, 10);
    if (inputPage >= 1 && inputPage <= totalPages) {
      onPageChange(inputPage);
    }
  };
  return (
    <Wrap>
      <div>
        <MoveBtn onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} $btnOn={currentPage === 1}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </MoveBtn>
        <PageSections>
          <CurrentPageInput type="number" value={currentPage} onChange={handlePageChange} />
          <TotalPageNum>/ {totalPages}</TotalPageNum>
        </PageSections>
        <MoveBtn
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          $btnOn={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faArrowRightLong} />
        </MoveBtn>
      </div>
    </Wrap>
  );
}

export default PageSelect;

const Wrap = styled.div`
  font-size: 18px;
  width: 200px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.gray2};
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PageSections = styled.div`
  margin: 0 4px 0 2px;
`;

const MoveBtn = styled.button`
  cursor: pointer;
  border: none;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray2};
  visibility: ${({ $btnOn }) => ($btnOn ? 'hidden' : 'visible')};
  opacity: ${({ $btnOn }) => ($btnOn ? '0' : '1')};
  background-color: transparent;
  margin-bottom: 3px;

  &:hover {
    color: ${({ theme }) => theme.colors.hover};
  }
`;

const CurrentPageInput = styled.input`
  font-size: 18px;
  max-width: 30px;
  text-align: center;
  border: none;
  box-sizing: border-box;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.colors.gray2};
  background-color: transparent;
  font-weight: 700;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const TotalPageNum = styled.span``;
