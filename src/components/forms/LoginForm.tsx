/** @jsxImportSource @emotion/react */
import { useForm, SubmitHandler } from 'react-hook-form'
import { css } from '@emotion/react'

interface LoginFormInput {
  id: string
  password: string
}

const regExpId = /^[a-z]+[a-z0-9]{5,19}$/
const regExpPw = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>()
  const onSubmit: SubmitHandler<LoginFormInput> = data => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)} css={css({ display: 'flex', flexDirection: 'column' })}>
      <input
        {...register('id', {
          required: { value: true, message: '아이디를 입력해주세요.' },
          pattern: { value: regExpId, message: '아이디는 영문+숫자 5~19자 이내여야 합니다.' },
        })}
        aria-invalid={errors.id ? 'true' : 'false'}
        placeholder="아이디"
      />
      {errors['id'] && <p role="alert">{errors['id'].message}</p>}
      <input
        {...register('password', {
          required: { value: true, message: '비밀번호를 입력해주세요.' },
          pattern: { value: regExpPw, message: '비밀번호는 문자,숫자,특수문자를 조합한 8~15자 이내여야 합니다.' },
        })}
        aria-invalid={errors.password ? 'true' : 'false'}
        placeholder="비밀번호"
        type="password"
      />
      {errors['password'] && <p role="alert">{errors['password'].message}</p>}

      <input type="submit" value="로그인" />
    </form>
  )
}

export default LoginForm
