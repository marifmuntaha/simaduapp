import {toastError} from "../components";

const handleError = (error) => {
    if (error.response) {
        const response = error.response;
        if (response.status === 403) {
            toastError('Anda tidak mempunyai akses pada halaman ini.');
        } else if (response.status === 401) {
            toastError('Sesi anda telah berakhir, silahkan masuk kembali.');
            localStorage.removeItem('token');
        } else {
            toastError(response.data.message);
        }
    } else {
        toastError(error.message);
    }
}
export default handleError;