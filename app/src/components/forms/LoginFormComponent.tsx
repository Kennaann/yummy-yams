import { useState } from "react"
import { AuthErrors, LoginUserData } from "../../types/auht.types"
import { validateLoginForm } from "../../utils/form-validator.utils"
import { Button } from "../core/ButtonComponent"
import { AuthInput } from "./AuthInputComponent"

export const LoginForm = () => {
  const [loginData, setLoginData] = useState<LoginUserData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<AuthErrors<LoginUserData>>({})

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof LoginUserData,
  ) => {
    setLoginData({ ...loginData, [name]: e.target.value })
    if (errors[name]) setErrors({ ...errors, [name]: undefined })
  }

  const onSubmit = () => {
    const { isValid, errors } = validateLoginForm(loginData)

    if (!isValid) {
      return setErrors(errors)
    }

    // Call API to login user
    console.log(loginData)
  }

  return (
    <form className="flex flex-col items-center mt-6 px-4 md:px-0 w-full max-w-96">
      <AuthInput
        type="emal"
        name="email"
        placeholder="Adresse email"
        value={loginData.email}
        errors={errors}
        onChange={e => onInputChange(e, "email")}
      />
      <AuthInput
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={loginData.password}
        errors={errors}
        onChange={e => onInputChange(e, "password")}
      />

      <Button type="primary" label="Se connecter" onClick={onSubmit} />
    </form>
  )
}
