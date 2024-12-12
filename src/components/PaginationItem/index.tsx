import React from 'react';

import { useAppDispatch } from '../../redux/store';
import { setPage, SwapiState } from '../../redux/swapi/swapiSlice';

import styles from './PaginationItem.module.css';

interface PaginationItemProps {
  page: number;
  activePage: number;
  entity: keyof SwapiState;
}

const PaginationItem: React.FC<PaginationItemProps> = ({ page, activePage, entity }) => {
  const dispatch = useAppDispatch();

  const changePage = () => {
    dispatch(setPage({ entity, page }));
  };

  return (
    <div
      className={`${styles.pagination_item_wrap} ${page === activePage ? styles.active_page : ''}`}
      onClick={changePage}>
      {page}
    </div>
  );
};

export default PaginationItem;
