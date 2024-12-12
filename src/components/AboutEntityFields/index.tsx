import React from 'react';

import styles from './AboutEntityFields.module.css';

interface AboutEntityFieldProps {
  name: string;
  value: string | number;
  isEditing: boolean;
  register: any;
}

const AboutEntityField: React.FC<AboutEntityFieldProps> = ({
  name,
  value,
  isEditing,
  register,
}) => {
  const formatName = (fieldName: string) => {
    return fieldName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1, word.length))
      .join(' ');
  };

  return (
    <p className={styles.form_field}>
      <span className={styles.field_name}>{formatName(name)}:</span>
      <span className={styles.field_text}>
        {isEditing ? <input type="text" defaultValue={value} {...register(name)} /> : value}
      </span>
    </p>
  );
};

export default AboutEntityField;
