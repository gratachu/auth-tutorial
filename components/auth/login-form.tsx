import {CardWrapper} from "./card-wrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel='Don’t have an account?'
      backButtonHref='/auth/register'
      showSocial
    >
      <h1>Login Form!</h1>
    </CardWrapper>
  )
}