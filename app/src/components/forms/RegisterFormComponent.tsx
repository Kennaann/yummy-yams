import { useState } from "react"
import { AuthErrors, RegisterUserData } from "../../types/auht.types"
import {
  validateLoginForm,
  validateRegisterForm,
} from "../../utils/form-validator.utils"
import { Button } from "../ButtonComponent"

export const RegisterForm = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<AuthErrors<RegisterUserData>>({})

  const onFirstnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value)
    if (errors.firstname) setErrors({ ...errors, firstname: undefined })
  }

  const onLastnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value)
    if (errors.lastname) setErrors({ ...errors, lastname: undefined })
  }

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errors.email) setErrors({ ...errors, email: undefined })
  }

  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (errors.password) setErrors({ ...errors, password: undefined })
  }

  const onSubmit = () => {
    const errors = validateRegisterForm({
      firstname,
      lastname,
      email,
      password,
    })
    setErrors(errors)
  }

  return (
    <form className="flex flex-col items-center mt-6 px-4 md:px-0 w-full max-w-96">
      <div className="w-full">
        <input
          type="text"
          className="w-full py-2 px-4 rounded-lg bg-slate-200 mt-4 focus:outline-slate-300"
          placeholder="Prénom"
          value={firstname}
          onChange={onFirstnameChanged}
        />
        {errors.firstname && (
          <p className="text-sm text-red-500 pt-2">{errors.firstname}</p>
        )}
      </div>

      <div className="w-full">
        <input
          type="text"
          className="w-full py-2 px-4 rounded-lg bg-slate-200 mt-4 focus:outline-slate-300"
          placeholder="Nom"
          value={lastname}
          onChange={onLastnameChanged}
        />
        {errors.lastname && (
          <p className="text-sm text-red-500 pt-2">{errors.lastname}</p>
        )}
      </div>

      <div className="w-full">
        <input
          type="email"
          className="w-full py-2 px-4 rounded-lg bg-slate-200 mt-4 focus:outline-slate-300"
          placeholder="Adresse email"
          value={email}
          onChange={onEmailChanged}
        />
        {errors.email && (
          <p className="text-sm text-red-500 pt-2">{errors.email}</p>
        )}
      </div>

      <div className="w-full">
        <input
          type="password"
          className="w-full py-2 px-4 rounded-lg bg-slate-200 mt-4 focus:outline-slate-300"
          placeholder="Mot de passe"
          value={password}
          onChange={onPasswordChanged}
        />
        {errors.password && (
          <p className="text-sm text-red-500 pt-2">{errors.password}</p>
        )}
      </div>

      <Button type="primary" label="Se connecter" onClick={onSubmit} />
    </form>
  )
}
