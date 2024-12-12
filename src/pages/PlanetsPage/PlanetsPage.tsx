import React from 'react';
import { NavLink } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { swapiFetchData } from '../../redux/swapi/swapiSlice';

import PaginationItem from '../../components/PaginationItem';

import { calcPaginationCount } from '../../utils/calcPaginationCount';

import styles from './PlatetsPage.module.css';

interface Planet {
  name: string;
  climate: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  population: string;
  url: string;
}

const PlanetsPage = () => {
  const dispatch = useAppDispatch();

  const { data, loading, error, page, count } = useSelector(
    (state: RootState) => state.swapi.planets,
  );

  const paginationCount = calcPaginationCount(count, 10);

  React.useEffect(() => {
    dispatch(swapiFetchData({ entity: 'planets', page }));
  }, [page]);

  return (
    <div className={styles.planets_page_wrap}>
      <h1>Planets Page {page}</h1>

      {loading && <p>Загрузка...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <table className={styles.planets_table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Climate</th>
              <th>Diameter</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {data[page]?.map((planet: Planet, index: number) => (
              <tr key={index}>
                <td>
                  <NavLink className={styles.table_link} to={planet.name}></NavLink>
                  {planet.name}
                </td>
                <td>{planet.climate}</td>
                <td>{planet.diameter}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.population}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className={styles.planets_pagination}>
        {paginationCount
          ? Array.from({ length: paginationCount }).map((_, index) => (
              <PaginationItem key={index} page={index + 1} activePage={page} entity={'planets'} />
            ))
          : null}
      </div>
    </div>
  );
};

export default PlanetsPage;
