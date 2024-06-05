import { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector, useDispatch } from 'react-redux'

//actions
import { resetAuth, forgotPassword } from '@/redux/actions'
import { RootState, AppDispatch } from '@/redux/store'

// components
import {AuthContainer, AuthLayout} from '@/components/AuthPageLayout'
import { FormInput, PageBreadcrumb, VerticalForm } from '@/components'

interface UserData {
	username: string
}

const RecoverPassword = () => {
	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		dispatch(resetAuth())
	}, [dispatch])

	const { passwordReset } = useSelector((state: RootState) => ({
		passwordReset: state.Auth.passwordReset,
	}))
	/*
	 * form validation schema
	 */
	const schemaResolver = yupResolver(
		yup.object().shape({
			username: yup.string().required('Masukkan nama pengguna'),
		})
	)
	/*
	 * handle form submission
	 */
	const onSubmit = (formData: UserData) => {
		dispatch(forgotPassword(formData.username))
	}
	return (
		<>
			<PageBreadcrumb title="Atur Ulang Sandi" />
			<AuthContainer>
				<AuthLayout authTitle="Atur Ulang Sandi" helpText="Masukkan nama pengguna anda, kami mengirimkan instruksi atur ulang sandi ke nomor terdaftar.">
					{!passwordReset && (
						<VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
							<FormInput label="Nama Pengguna" type="text" name="username" placeholder="Masukkan nama pengguna" containerClass="mb-6 space-y-2" className="form-input" required />
							<div className="text-center">
								<button className="btn bg-primary text-white" type="submit">
									<i className="ri-login-box-line me-1"></i> Atur Ulang{' '}
								</button>
							</div>
						</VerticalForm>
					)}
				</AuthLayout>
			</AuthContainer>
		</>
	)
}

export default RecoverPassword
