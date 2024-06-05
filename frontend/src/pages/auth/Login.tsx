import {useEffect} from 'react'
import {Link, Navigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@/redux/store'
import {loginUser, resetAuth} from '@/redux/actions'

// form validation
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

// components
import {AuthLayout, AuthContainer} from '@/components/AuthPageLayout'
import {VerticalForm, FormInput} from '@/components'

interface UserData {
    username: string
    password: string
}

const Login = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {user, userLoggedIn, loading, error} = useSelector((state: RootState) => ({
        user: state.Auth.user,
        loading: state.Auth.loading,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }))

    useEffect(() => {
        dispatch(resetAuth())
    }, [dispatch])

    /*
  form validation schema
  */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required('Masukkan nama pengguna'),
            password: yup.string().required('Masukkan kata sandi'),
        })
    )

    /*
  handle form submission
  */
    const onSubmit = (formData: UserData) => {
        dispatch(loginUser(formData['username'], formData['password']))
    }

    const location = useLocation()

    // redirection back to where user got redirected from
    const redirectUrl = location?.search?.slice(6) || '/'
    return (
        <>
            {(userLoggedIn || user) && <Navigate to={redirectUrl}/>}
            <AuthContainer>
                <AuthLayout
                    authTitle="MASUK"
                    helpText="Masukkan akun anda untuk mengakses halaman panel.">
                    {error && (
                        <div className="bg-danger/10 text-danger border border-danger/20 text-sm rounded py-3 px-5 mb-4"
                             role="alert"><span className="font-bold">Kesalahan! </span> - {error}
                        </div>
                    )}
                    <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
                        <FormInput
                            label="Nama Pengguna"
                            type="text"
                            name="username"
                            className="form-input"
                            placeholder="Masukkan nama pengguna anda."
                            containerClass="mb-6 space-y-2"
                            labelClassName="font-semibold text-gray-500"
                            required/>
                        <FormInput
                            label="Kata Sandi"
                            type="password"
                            name="password"
                            placeholder="Masukkan kata sandi anda."
                            className="form-input rounded-e-none"
                            containerClass="mb-6 space-y-2"
                            labelClassName="font-semibold text-gray-500"
                            labelContainerClassName="flex justify-between items-center mb-2"
                            required>
                            <Link to="/autentifikasi/lupa-sandi"
                                  className="text-muted text-xs underline decoration-dashed underline-offset-4">
                                Lupa Kata Sandi?
                            </Link>
                        </FormInput>
                        <FormInput
                            label="Ingat Saya?"
                            type="checkbox"
                            name="checkbox"
                            className="form-checkbox rounded text-primary"
                            containerClass="mb-6"
                            labelClassName="ms-2"
                            defaultChecked/>

                        <div className="text-center mb-6">
                            <button className="btn bg-primary text-white" type="submit" disabled={loading}>
                                MASUK
                            </button>
                        </div>
                    </VerticalForm>
                </AuthLayout>
            </AuthContainer>
        </>
    )
}

export default Login
