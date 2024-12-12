import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  const { pathname } = useLocation();

  return (
    <div className={styles.app_wrap}>
      <header>
        <div className={styles.logo}>
          <NavLink to={'/'}>LOGO</NavLink>
        </div>

        <nav className={styles.menu}>
          <ul className={styles.menu_list}>
            <li className={styles.menu_list_item}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.menu_link} ${isActive ? styles.active_menu_link : ''}`
                }
                to="people">
                Персонажи
              </NavLink>
            </li>
            <li className={styles.menu_list_item}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.menu_link} ${isActive ? styles.active_menu_link : ''}`
                }
                to="planets">
                Планеты
              </NavLink>
            </li>
            <li className={styles.menu_list_item}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.menu_link} ${isActive ? styles.active_menu_link : ''}`
                }
                to="starships">
                Корабли
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.logout}>
          <NavLink
            to={'/login'}
            onClick={() => {
              localStorage.removeItem('user');
            }}>
            <svg
              style={{ cursor: 'pointer' }}
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9999 11.6667V9.66671C10.9999 9.29852 10.7014 9.00004 10.3333 9.00004C9.96506 9.00004 9.66658 9.29852 9.66658 9.66671V11.6667C9.66658 12.0349 9.36811 12.3334 8.99992 12.3334H2.33325C1.96506 12.3334 1.66659 12.0349 1.66659 11.6667V2.33337C1.66659 1.96518 1.96506 1.66671 2.33325 1.66671H8.99992C9.36811 1.66671 9.66658 1.96518 9.66658 2.33337V4.33337C9.66658 4.70156 9.96506 5.00004 10.3333 5.00004C10.7014 5.00004 10.9999 4.70156 10.9999 4.33337V2.33337C10.9999 1.2288 10.1045 0.333374 8.99992 0.333374H2.33325C1.22868 0.333374 0.333252 1.2288 0.333252 2.33337V11.6667C0.333252 12.7713 1.22868 13.6667 2.33325 13.6667H8.99992C10.1045 13.6667 10.9999 12.7713 10.9999 11.6667ZM12.1399 5.19337L13.4733 6.52671C13.5995 6.65189 13.6705 6.82228 13.6705 7.00004C13.6705 7.1778 13.5995 7.3482 13.4733 7.47337L12.1399 8.80671C12.0147 8.93292 11.8443 9.00391 11.6666 9.00391C11.4888 9.00391 11.3184 8.93292 11.1933 8.80671C11.067 8.68153 10.9961 8.51113 10.9961 8.33337C10.9961 8.15562 11.067 7.98522 11.1933 7.86004L11.3933 7.66671H6.99992C6.63173 7.66671 6.33325 7.36823 6.33325 7.00004C6.33325 6.63185 6.63173 6.33337 6.99992 6.33337H11.3933L11.1933 6.14004C10.9318 5.87863 10.9318 5.45479 11.1933 5.19337C11.4547 4.93196 11.8785 4.93196 12.1399 5.19337Z"
                fill="#231F20"
              />
            </svg>
          </NavLink>
        </div>
      </header>

      <div className={styles.app_info}>{pathname === '/' ? <h1>Hello wordl</h1> : <Outlet />}</div>
    </div>
  );
}

export default App;
