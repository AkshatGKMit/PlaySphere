import React, { memo, useEffect, useRef, useState } from 'react';
import { View, Animated, Pressable, TextInput } from 'react-native';
import { BlurView } from '@react-native-community/blur';

import ActionButton from '@components/actionButton';
import TextBlock from '@components/textBlock';
import Textfield from '@components/textfield';
import { AuthFields, FontWeight, Icons, Typography } from '@constants';
import { globalStyles } from '@themes';

const Form = ({
  authTypeLogin,
  setAuthTypeLogin,
  formOptions,
  styles,
  containerStyles,
  buttonContainerStyles,
  authenticate,
  loading,
}: AuthFormComponent) => {
  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    usernameRef.current?.blur();
    emailRef.current?.blur();
    passwordRef.current?.blur();
  }, [authTypeLogin]);

  const { data, handleChangeText, fieldErrors, nonFieldError } = formOptions;

  const { email, password, username } = data;
  const { email: emailError, password: passwordError, username: usernameError } = fieldErrors;

  const onPasswordEndEditing = () => {
    passwordRef.current?.blur();
    authenticate();
  };

  return (
    <Animated.View style={containerStyles}>
      <BlurView
        style={globalStyles.fullPositionAbsolute}
        blurAmount={30}
        blurRadius={15}
        blurType="dark"
      />
      <TextBlock
        typography={Typography.headlineLarge}
        fontWeight={FontWeight.bold}
        style={styles.heading}
      >
        {authTypeLogin ? 'Log In' : 'Create a new account'}
      </TextBlock>
      {nonFieldError ? (
        <TextBlock
          typography={Typography.bodySmall}
          color={styles.error.color}
          style={styles.nonFieldErrorText}
        >
          {nonFieldError}
        </TextBlock>
      ) : null}
      {!authTypeLogin ? (
        <Textfield
          ref={usernameRef}
          placeholder="Username"
          leadingIcon={Icons.fontisto.person}
          value={username}
          onChangeText={(text) => handleChangeText(AuthFields.username, text)}
          error={usernameError}
          enterKeyHint="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          autoCapitalize="none"
          textContentType="username"
        />
      ) : null}
      <Textfield
        ref={emailRef}
        placeholder="Email"
        leadingIcon={Icons.materialIcons.alternateEmail}
        value={email}
        onChangeText={(text) => handleChangeText(AuthFields.email, text)}
        error={emailError}
        enterKeyHint="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <Textfield
        ref={passwordRef}
        placeholder="Password"
        leadingIcon={Icons.materialIcons.password}
        trailingIcon={
          isPasswordVisible ? Icons.materialCommunityIcons.eye : Icons.materialCommunityIcons.eyeOff
        }
        onPressTrailingIcon={() => setPasswordVisible((isVisible) => !isVisible)}
        value={password}
        onChangeText={(text) => handleChangeText(AuthFields.password, text)}
        error={passwordError}
        secureTextEntry={!isPasswordVisible}
        enterKeyHint="done"
        onSubmitEditing={onPasswordEndEditing}
        keyboardType="visible-password"
        textContentType="password"
        autoCapitalize="none"
        autoComplete="off"
      />
      <Animated.View style={buttonContainerStyles}>
        <ActionButton
          label={authTypeLogin ? 'Login' : 'Sign Up'}
          style={styles.button}
          fontWeight={FontWeight.bold}
          loading={loading}
          onPress={authenticate}
        />
        <View style={styles.authOptions}>
          <TextBlock>
            {authTypeLogin ? "Didn't have an account?" : 'Already have an account!'}
          </TextBlock>
          <Pressable onPress={() => setAuthTypeLogin((value: boolean) => !value)}>
            <TextBlock style={styles.authOptionTextButton}>
              {authTypeLogin ? 'Sign Up' : 'Login'}
            </TextBlock>
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Form);
