import { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { AxiosInstance } from "axios";

const withErrorHandler =
  (WrappedComponent: any, axios: AxiosInstance) => (props: any) => {
    const [error, setError] = useState<any>(null); //todo remove any
    const errorConfirmedHandler = () => setError(null);

    useEffect(() => {
      const reqInterceptor = axios.interceptors.request.use((req: any) => {
        useState(null);
        return req;
      });
      const resInterceptor = axios.interceptors.response.use(
        (res: any) => res,
        (error: any) => {
          useState(error);
        }
      );
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    });

    return (
      <>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error
            ? error.response.status === 401
              ? "please log in"
              : error.message
            : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };

export default withErrorHandler;
