import { useState } from "react"
import { AuthErrors, LoginUserData } from "../../types/auht.types"
import { validateLoginForm } from "../../utils/form-validator.utils"
import { Button } from "../core/ButtonComponent"
import { AuthInput } from "./AuthInputComponent"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { loginUser } from "../../features/userSlice"

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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

  const onSubmit = async () => {
    const { isValid, errors } = validateLoginForm(loginData)

    if (!isValid) {
      return setErrors(errors)
    }

    await dispatch(loginUser(loginData))
    navigate("/")
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
      <div className="w-full">
        <AuthInput
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={loginData.password}
          errors={errors}
          onChange={e => onInputChange(e, "password")}
        />
        <p className="text-sm mt-2 text-slate-600">
          Pas encore inscrit ?
          <Link to="/inscription">
            <span className="underline text-pink-400 p-2">Créer un compte</span>
          </Link>
        </p>
      </div>

      <Button type="primary" label="Se connecter" onClick={onSubmit} />
    </form>
  )
}
