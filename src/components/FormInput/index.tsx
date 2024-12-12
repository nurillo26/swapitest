import React from 'react';

import styles from './FormInput.module.css';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  register: any;
  errors: any;
  icons: {
    userIcon?: string;
    passwordIcon?: string;
    eyeOpen?: string;
    eyeClose?: string;
  };
}

const FormInput: React.FC<FormInputProps> = ({ label, type, name, register, errors, icons }) => {
  return (
    <div className={styles.input_block}>
      <span className={styles.input_label}>{label}</span>
      <div className={styles.input_item_wrap}>
        <div className={styles.input_icon_img}>
          <img src={type === 'text' ? icons.userIcon : icons.passwordIcon} alt="#" />
        </div>
        <input
          className={styles.input}
          type={type}
          placeholder="admin"
          {...register(name, { required: type === 'text' ? 'Введите логин' : 'Введите пароль' })}
        />
      </div>

      {errors[name] && <span className={styles.error_block}>{errors[name].message}</span>}
    </div>
  );
};

export default FormInput;
