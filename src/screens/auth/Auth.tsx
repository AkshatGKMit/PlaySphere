import { Animated, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';

import AppIntro from '@components/appIntro';
import BannerImageView from '@components/bannerImageView';
import { useForm } from '@config/useForm';
import useStyles from '@config/useStyles';
import { QueryKeys } from '@constants';
import useAuthMutation from '@network/hooks/useAuthenticationMutation';
import { globalStyles } from '@themes';
import { authValidations } from '@utility/validations';

import ThemedStyles from './styles';
import Form from './Form';
import Animation from './Animation';

const { authentication: authKey } = QueryKeys;

const initialData: RegisterBody = {
  username: '',
  email: '',
  password: '',
};

const Auth = () => {
  const [isAuthTypeLogin, setAuthTypeLogin] = useState(true);

  const formData = useForm<RegisterBody>({
    initialData,
    validations: authValidations(isAuthTypeLogin),
  });

  const { handleSubmit } = formData;

  const queryKey: AuthQueryKey = [authKey, formData.data];

  const { mutate, loading, error } = useAuthMutation(queryKey, { isLogin: isAuthTypeLogin });

  const { setData, setFieldErrors, setNonFieldError } = formData;

  useEffect(() => {
    if (error?.response?.data) {
      const { non_field_errors, email, password, username } = error.response.data;

      setNonFieldError(non_field_errors?.join('\n') || '');
      setFieldErrors({
        email: email?.join('\n') || '',
        password: password?.join('\n') || '',
        username: username?.join('\n') || '',
      });
    }
  }, [error, setFieldErrors, setNonFieldError]);

  useEffect(() => {
    setData({ email: '', password: '', username: '' });

    setNonFieldError('');
    setFieldErrors({
      email: '',
      password: '',
      username: '',
    });
  }, [isAuthTypeLogin, setData, setFieldErrors, setNonFieldError]);

  const authenticate = () => {
    handleSubmit((data) => {
      mutate(data);
    });
  };

  const { backdropHeight, buttonContainerPaddingBottom, containerTop, appIntroOpacity } =
    Animation();
  const styles = useStyles(ThemedStyles);

  const backdropStyles = useMemo(
    () => ({
      ...globalStyles.flex1,
      maxHeight: backdropHeight,
    }),
    [backdropHeight],
  );

  const containerStyles = useMemo(
    () => [styles.mainContainer, { top: containerTop }],
    [containerTop, styles.mainContainer],
  );
  const buttonContainerStyles = useMemo(
    () => [styles.buttonContainer, { paddingBottom: buttonContainerPaddingBottom }],
    [buttonContainerPaddingBottom, styles.buttonContainer],
  );

  return (
    <View style={styles.screen}>
      <View style={styles.backgroundContainer}>
        <BannerImageView />
        <Animated.View style={backdropStyles}>{AppIntro(appIntroOpacity)}</Animated.View>
      </View>
      <Form
        authTypeLogin={isAuthTypeLogin}
        setAuthTypeLogin={setAuthTypeLogin}
        formOptions={formData}
        styles={styles}
        containerStyles={containerStyles}
        buttonContainerStyles={buttonContainerStyles}
        authenticate={authenticate}
        loading={loading}
      />
    </View>
  );
};

export default Auth;
