import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { setCurrentUser } from '../../redux/user/userSlice';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormInput from '../FormInput';

import userIcon from '../../assets/form_icons/user.svg';
import passwordIcon from '../../assets/form_icons/password_icon.svg';
import eyeOpen from '../../assets/form_icons/eye.svg';
import eyeClose from '../../assets/form_icons/eye-slash.svg';

import styles from './Form.module.css';

interface UserData {
  userName: string;
  password: string;
}

// Схема валидации с Yup
const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .required('Логин обязателен')
    .min(3, 'Логин должен содержать не менее 3 символов'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(3, 'Пароль должен содержать не менее 3 символов'),
});

const Form = () => {
  const { login, password } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<UserData> = (data) => {
    if (data.userName === login && data.password === password) {
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(setCurrentUser(data));

      const toastId = toast.success('Успешно вошли!');
      toast.onChange((payload) => {
        if (payload.id === toastId && payload.status === 'removed') {
          navigate('/');
        }
      });
    } else {
      toast.error('Неверный логин или пароль');
    }
  };

  return (
    <div>
      <form className={styles.form_wrap} onSubmit={handleSubmit(onSubmit)}>
        <h3>LOGO</h3>

        <FormInput
          label="Login"
          type="text"
          name="userName"
          register={register}
          errors={errors}
          icons={{ userIcon }}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          icons={{ passwordIcon, eyeOpen, eyeClose }}
        />

        <button className={styles.signin_btn} type="submit">
          Sign in
        </button>
      </form>

      <ToastContainer position="bottom-center" autoClose={2500} />
    </div>
  );
};

export default Form;
