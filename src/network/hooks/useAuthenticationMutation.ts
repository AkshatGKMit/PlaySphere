import { useState } from 'react';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { requestLogin, requestSignUp } from '@network/apiEndpointCalls';
import instance from '@network/instance';
import { useAppDispatch } from '@store';
import { fetchCurrentUserAction } from '@store/actions/userActions';
import { login } from '@store/reducers/auth';

const useAuthMutation = (mutationKey: AuthQueryKey, config: AuthQueryConfig): UseAuthQuery => {
  const { isLogin } = config;

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const mutationFunction = async function (data: RegisterBody) {
    return isLogin ? requestLogin(data) : requestSignUp(data);
  };

  const onMutationSuccess = (
    data: ApiSuccessResponse<AuthSuccessResponse> | ApiErrorResponse<AuthErrorResponse>,
  ) => {
    if (data.success) {
      const { key } = data.result.data;
      const token = `Token ${key}`;

      instance.interceptors.request.use((requestConfig) => {
        requestConfig.headers.set('token', token);
        return requestConfig;
      });

      dispatch(login(token));
      setLoading(false);

      dispatch(fetchCurrentUserAction());
    } else {
      setLoading(false);
    }
  };

  const { mutate, error } = useMutation<
    ApiSuccessResponse<AuthSuccessResponse> | ApiErrorResponse<AuthErrorResponse>,
    AxiosError<AuthErrorResponse>,
    RegisterBody,
    void
  >({
    mutationKey,
    mutationFn: mutationFunction,
    onSuccess: onMutationSuccess,
    onMutate: () => setLoading(true),
    onError: () => setLoading(false),
  });

  return { mutate, error, loading };
};

export default useAuthMutation;
