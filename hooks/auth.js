import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
 
import { useDispatch, useSelector } from 'react-redux'
import { setData, setError, setUser } from '@/store/reducers/auth/authSlice'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const {error:errorRes , loading , user:userRes , data}=  useSelector((state)=>state.auth);
    console.log(data);
    const dispatch = useDispatch();
    const  user=()=>{  
        axios
            .get('/api/user')
           .then(response =>  dispatch(setUser(response.data)))
           .catch(error => {
                 if (error.response.status !== 409) throw error

               router.push('/login&register')
    }) }
 
     
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const loginRegister = async (formData) => {
         await csrf()

        // setErrors([])

        axios
            .post('/login-register', formData)
            .then(response =>  dispatch(setData(response.data)))
            .catch(error => {
                if (error.response.status !== 422) throw error

                dispatch( setError(error.response.data.errors));
            })
    }
     
    const loginConfirmForm = async (data) => {
        axios
            .get(`api/login-confirm-form/${data}`)
            .then((response) =>  dispatch(setData(response.data)))
            .catch(error => {
                if (error.response?.status !== 422) throw error

                dispatch( setError(error.response?.data.errors));
            })
    }

   const loginConfirm = async (formData, token) => {
         await csrf()

        // setErrors([])

        axios
            .post(`api/login-confirm/${token}`, formData)
            .then(response =>  dispatch(setData(response.data)))
            .catch(error => {
                if (error.response.status !== 422) throw error

                dispatch( setError(error.response.data.errors));
            })
        if(data){
             user()
             router.push('/profile/profile')
        };    
    }
     
       

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    // useEffect(() => {
    //     if (middleware === 'guest' && redirectIfAuthenticated && user)
    //         router.push(redirectIfAuthenticated)
    //     if (
    //         window.location.pathname === '/verify-email' &&
    //         user?.email_verified_at
    //     )
    //         router.push(redirectIfAuthenticated)
    //     if (middleware === 'auth' && error) logout()
    // }, [  error])

    return {

         user,
        loginRegister,
        loginConfirmForm,
        loginConfirm,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}