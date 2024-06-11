import React from "react";
import { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { AxiosInstance, AxiosError } from "axios";

const withErrorHandler =
  <TProps extends JSX.IntrinsicAttributes>(
    WrappedComponent: React.FC<TProps>,
    axios: AxiosInstance
  ) =>
  (props: TProps) => {
    const [error, setError] = useState<null | AxiosError>(null);

    useEffect(() => {
      const reqInterceptor = axios.interceptors.request.use((req) => {
        setError(null);
        return req;
      });
      const resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          setError(error);
        }
      );
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    });

    return (
      <>
        <Modal show={error ? true : false} modalClosed={() => setError(null)}>
          {error
            ? error.response?.status === 401
              ? "please log in"
              : error.message
            : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };

export default withErrorHandler;
