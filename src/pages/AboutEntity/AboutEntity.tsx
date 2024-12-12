import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { SwapiState, updateEntityData } from '../../redux/swapi/swapiSlice';

import AboutEntityField from '../../components/AboutEntityFields';

import styles from './AboutEntity.module.css';

const AboutEntity = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { entity, name } = useParams<{ entity: keyof SwapiState; name: string }>();
  const [isEditing, setIsEditing] = React.useState(false);

  const { data, page } = entity
    ? useSelector((state: RootState) => state.swapi[entity]) || { data: null }
    : { data: null };

  const selectedItem =
    data && page !== undefined
      ? data[page].find((item: { name: string }) => item.name === name)
      : null;

  const { register, handleSubmit } = useForm({});

  const onSubmit: SubmitHandler<any> = (data) => {
    if (selectedItem?.url) {
      data.url = selectedItem.url;
    }

    if (entity) dispatch(updateEntityData({ entity, updData: data }));

    navigate(`/${entity}/${data.name}`, { replace: true });
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  if (!selectedItem) {
    return <div>Элемент не найден</div>;
  }

  return (
    <div className={styles.about_wrap}>
      <h1 className={styles.about_title}>About {selectedItem.name}</h1>

      <form className={styles.edit_form} onSubmit={handleSubmit(onSubmit)}>
        {Object.entries(selectedItem).map(([key, value]) => {
          if (key === 'url') {
            return null;
          }

          if (typeof value === 'string' || typeof value === 'number') {
            return (
              <AboutEntityField
                key={key}
                isEditing={isEditing}
                name={key}
                value={value}
                register={register}
              />
            );
          }
        })}

        {isEditing ? (
          <button className={styles.form_btn} type="button" onClick={toggleEditing}>
            Save
          </button>
        ) : (
          <button className={styles.form_btn} onClick={toggleEditing}>
            Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default AboutEntity;
