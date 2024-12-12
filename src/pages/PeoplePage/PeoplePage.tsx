import React from 'react';
import { NavLink } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { swapiFetchData } from '../../redux/swapi/swapiSlice';

import PaginationItem from '../../components/PaginationItem';

import { calcPaginationCount } from '../../utils/calcPaginationCount';

import styles from './PeoplePage.module.css';

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

const PeoplePage = () => {
  const dispatch = useAppDispatch();

  const { data, loading, error, page, count } = useSelector(
    (state: RootState) => state.swapi.people,
  );

  const paginationCount = calcPaginationCount(count, 10);

  React.useEffect(() => {
    dispatch(swapiFetchData({ entity: 'people', page }));
  }, [page]);

  return (
    <div className={styles.people_info_wrap}>
      <h1>People Page {page}</h1>

      {loading && <p>Загрузка...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <table className={styles.people_table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Hair Color</th>
              <th>Skin Color</th>
              <th>Birth Year</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {data[page]?.map((person: Person, index: number) => (
              <tr key={index}>
                <td>
                  <NavLink className={styles.table_link} to={person.name}></NavLink>
                  {person.name}
                </td>
                <td>{person.height}</td>
                <td>{person.mass}</td>
                <td>{person.hair_color}</td>
                <td>{person.skin_color}</td>
                <td>{person.birth_year}</td>
                <td>{person.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className={styles.people_pagination}>
        {paginationCount
          ? Array.from({ length: paginationCount }).map((_, index) => (
              <PaginationItem key={index} page={index + 1} activePage={page} entity={'people'} />
            ))
          : null}
      </div>
    </div>
  );
};

export default PeoplePage;
