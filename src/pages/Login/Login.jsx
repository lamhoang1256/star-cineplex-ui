import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "redux/actions/auth.action";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorLogin, userInfo } = useSelector((state) => state.auth);
  const userLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // xử lí login
  const handleLogin = (data) => {
    const dataToLogin = { taiKhoan: data.username, matKhau: data.password };
    dispatch(loginAction(dataToLogin));
  };

  useEffect(() => {
    if (userLocalStorage) {
      navigate("/");
    }
  }, [userLocalStorage]);

  return (
    <div className='auth login'>
      <div className='auth-container'>
        <div className='auth-main'>
          <h2 className='auth-heading'>Đăng nhập</h2>
          <form className='auth-content' onSubmit={handleSubmit(handleLogin)}>
            {/* tên tài khoản */}
            <div className='auth-group'>
              <ion-icon name='person-outline'></ion-icon>
              <input
                type='text'
                className='auth-input auth-username'
                placeholder='Tên tài khoản *'
                {...register("username", { required: true, minLength: 6, maxLength: 14 })}
              />
            </div>
            {errors.username && errors.username.type === "required" && (
              <span className='text--primary'>Tên tài khoản không được để trống !</span>
            )}
            {errors.username && errors.username.type === "minLength" && (
              <span className='text--primary'>Tên tài khoản ít nhất bao gồm 6 kí tự !</span>
            )}
            {errors.username && errors.username.type === "maxLength" && (
              <span className='text--primary'>Tên tài khoản nhiều nhất bao gồm 15 kí tự !</span>
            )}

            {/* mật khẩu */}
            <div className='auth-group'>
              <ion-icon name='lock-closed-outline'></ion-icon>
              <input
                type='password'
                className='auth-input auth-password'
                placeholder='Mật khẩu *'
                {...register("password", { required: true, minLength: 6, maxLength: 16 })}
              />
            </div>
            {errors.password && errors.password.type === "required" && (
              <span className='text--primary'>Mật khẩu không được để trống !</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className='text--primary'>Mật khẩu ít nhất bao gồm 6 kí tự !</span>
            )}
            {errors.password && errors.password.type === "maxLength" && (
              <span className='text--primary'>Mật khẩu nhiều nhất bao gồm 15 kí tự !</span>
            )}

            {errorLogin && <p className='text--primary'>{errorLogin.content}</p>}

            {/* nút submit */}
            <button className='auth-submit btn btn--primary' type='submit'>
              Đăng nhập
            </button>

            {!userInfo && (
              <div className='auth-switch'>
                Bạn đã chưa có tài khoản ?{" "}
                <Link to='/auth/register' className='text--primary'>
                  Đăng kí
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};