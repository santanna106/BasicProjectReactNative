import React from 'react';

import {
  Container,
  Title,
  Button,
  ButtonText
} from './styles';

import {useAuth} from '../../hooks/auth';


export function SignIn(){
  
  const { signInWithGoogle } = useAuth();

  function handleSignIn(){
    signInWithGoogle();
  }

  return (
    <Container>
      <Title>SignIn</Title>
      <Button onPress={handleSignIn}>
        <ButtonText>Login</ButtonText>
      </Button>
    </Container>
  );
}