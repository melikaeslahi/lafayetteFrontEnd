'use client';
import { useCsrfQuery } from "@/lib/auth/authApi";
import { useGetOtpDataMutation, useLoginConfirmMutation, useLoginRegisterMutation, useLogoutMutation, useResendOtpMutation, useUserMutation } from "@/lib/auth/loginRegisterApi";
import { setData, setError, setLoading, setUser } from "@/store/reducers/auth/authSlice";
import axios from '@/lib/axios'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const { data: dataSelector } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [userReq] = useUserMutation();
  const [loginRegister] = useLoginRegisterMutation();
  const [loginConfirmation] = useLoginConfirmMutation();
  const [otpData] = useGetOtpDataMutation();
  const [resendOtp] = useResendOtpMutation();
  const [logOut] = useLogoutMutation();


  const user = async () => {
    try {
      dispatch(setLoading(true));
      const user = await userReq().unwrap();
      if (user?.status === 200) {
        dispatch(setUser(user));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(user));
      }
    } catch (error) {
      dispatch(setLoading(false));

    }



  }
  const csrf = () => axios.get('sanctum/csrf-cookie')
  const login = async (formData) => {

    await csrf()
    try {
      dispatch(setLoading(true));
      const data = await loginRegister(formData).unwrap();
      if (data?.status === 200) {
        dispatch(setData(data));
        dispatch(setLoading(false));
        router.push(`/login&register/verificationCode`);
        loginConfirmForm(data.token);
      } else {
        dispatch(setError(data));
      }
    } catch (error) {
      dispatch(setLoading(false));

    }
  }
  const loginConfirmForm = async (token) => {
    await csrf()
    try {
      dispatch(setLoading(true));
      const data = await otpData(token).unwrap();
      if (data?.status === 200) {
        localStorage.setItem('token', data.token);
        dispatch(setData(data));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(data));
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  }

  const loginConfirm = async (formData) => {
    await csrf()

    try {
      dispatch(setLoading(true));
      const data = await loginConfirmation({ formData, token: dataSelector.token }).unwrap();
      if (data?.status === 200) {
        dispatch(setData(data));
        dispatch(setLoading(false));
        router.push('/profile/profile');
        user();
      } else {
        dispatch(setError(data));
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  }
  const resendOtpCode = async () => {
    await csrf()

    try {
      dispatch(setLoading(true));
      const data = await resendOtp(dataSelector.token).unwrap();
      if (data?.status === 200) {
        localStorage.setItem('token', data.token);
        dispatch(setData(data));
        loginConfirmForm(data.token);
        dispatch(setLoading(false));
      } else {
        dispatch(setError(data));
      }
    } catch (error) {
      dispatch(setLoading(false));

    }
  }
  const logout = async () => {
    await csrf()
    try {
      dispatch(setLoading(true));
      const data = await logOut().unwrap();
      if (data?.status === 200) {
        dispatch(setUser(null));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(data));
      }
    } catch (error) {
      dispatch(setLoading(false));

    }

  }

  return {
    user,
    login,
    loginConfirmForm,
    loginConfirm,
    logout,
    resendOtpCode
  }
}
export default useAuth;