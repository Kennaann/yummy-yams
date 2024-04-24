import { useState } from "react"
import { AuthErrors, RegisterUserData } from "../../types/auht.types"
import { validateRegisterForm } from "../../utils/form-validator.utils"
import { Button } from "../core/ButtonComponent"
import { AuthInput } from "./AuthInputComponent"

export const RegisterForm = () => {
  const [registerData, setRegisterData] = useState<RegisterUserData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<AuthErrors<RegisterUserData>>({})

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof RegisterUserData,
  ) => {
    setRegisterData({ ...registerData, [name]: e.target.value })
    if (errors[name]) setErrors({ ...errors, [name]: undefined })
  }

  const onSubmit = () => {
    const { isValid, errors } = validateRegisterForm(registerData)
    if (!isValid) return setErrors(errors)

    // Call API to login user
    console.log(registerData)
  }

  return (
    <form className="flex flex-col items-center mt-6 px-4 md:px-0 w-full max-w-96">
      <AuthInput
        type="text"
        name="firstname"
        placeholder="Prénom"
        value={registerData.firstname}
        errors={errors}
        onChange={e => onInputChange(e, "firstname")}
      />
      <AuthInput
        type="text"
        name="lastname"
        placeholder="Nom"
        value={registerData.lastname}
        errors={errors}
        onChange={e => onInputChange(e, "lastname")}
      />
      <AuthInput
        type="email"
        name="email"
        placeholder="Adresse email"
        value={registerData.email}
        errors={errors}
        onChange={e => onInputChange(e, "email")}
      />
      <AuthInput
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={registerData.password}
        errors={errors}
        onChange={e => onInputChange(e, "password")}
      />

      <Button type="primary" label="Se connecter" onClick={onSubmit} />
    </form>
  )
}
