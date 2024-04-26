import { useState } from "react"
import { AuthErrors, RegisterUserData } from "../../types/auth.types"
import { validateRegisterForm } from "../../utils/form-validator.utils"
import { Button } from "../core/ButtonComponent"
import { AuthInput } from "./AuthInputComponent"
import { useAppDispatch } from "../../app/hooks"
import { registerUser, removeAuthError } from "../../features/userSlice"
import { Link, useNavigate } from "react-router-dom"

export const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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

  const onSubmit = async () => {
    const { isValid, errors } = validateRegisterForm(registerData)
    if (!isValid) return setErrors(errors)

    const response = await dispatch(registerUser(registerData))
    // @ts-ignore
    const error = !!response.error

    if (error) {
      return setTimeout(() => {
        dispatch(removeAuthError())
      }, 5000)
    }

    navigate("/")
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
      <div className="w-full">
        <AuthInput
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={registerData.password}
          errors={errors}
          onChange={e => onInputChange(e, "password")}
        />
        <p className="text-sm mt-2 text-slate-600">
          Déjà inscrit ?
          <Link to="/connexion">
            <span className="underline text-pink-400 p-2">Se connecter</span>
          </Link>
        </p>
      </div>

      <Button type="primary" label="S'inscrire'" onClick={onSubmit} />
    </form>
  )
}
