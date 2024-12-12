import React from 'react';
import { NavLink } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { swapiFetchData } from '../../redux/swapi/swapiSlice';

import PaginationItem from '../../components/PaginationItem';

import { calcPaginationCount } from '../../utils/calcPaginationCount';

import styles from './StarshipsPage.module.css';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  passengers: string;
  starship_class: string;
  url: string;
}

const StarshipsPage = () => {
  const dispatch = useAppDispatch();

  const { data, loading, error, page, count } = useSelector(
    (state: RootState) => state.swapi.starships,
  );

  const paginationCount = calcPaginationCount(count, 10);

  React.useEffect(() => {
    dispatch(swapiFetchData({ entity: 'starships', page }));
  }, [page]);

  return (
    <div className={styles.starships_page_wrap}>
      <h1>Starships Page {page}</h1>

      {loading && <p>Загрузка...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <table className={styles.starshipsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Cost (Credits)</th>
              <th>Length</th>
              <th>Passengers</th>
              <th>Starship Class</th>
            </tr>
          </thead>
          <tbody>
            {data[page]?.map((ship: Starship, index: number) => (
              <tr key={index}>
                <td>
                  <NavLink className={styles.table_link} to={ship.name}></NavLink>
                  {ship.name}
                </td>
                <td>{ship.model}</td>
                <td>{ship.manufacturer}</td>
                <td>{ship.cost_in_credits}</td>
                <td>{ship.length}</td>
                <td>{ship.passengers}</td>
                <td>{ship.starship_class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className={styles.ships_pagination}>
        {paginationCount ? (
          Array.from({ length: paginationCount }).map((_, index) => (
            <PaginationItem key={index} page={index + 1} activePage={page} entity="starships" />
          ))
        ) : (
          <h4>Skeleton</h4>
        )}
      </div>
    </div>
  );
};

export default StarshipsPage;
