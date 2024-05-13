import { Link, useNavigate } from "react-router-dom"
import { GameState, resetGame } from "../../features/gameSlice"
import { useEffect, useState } from "react"
import { ErrorResponseToMessageMap } from "../../utils/game.utils"
import { removeToken } from "../../utils/jwt.utils"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { removeUser } from "../../features/userSlice"

export const ErrorBanner = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.game.error)
  const [redirect, setRedirect] = useState({ to: "", label: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (error) handleErrors(error)
  }, [error])

  const handleErrors = (error: GameState["error"]) => {
    const errorMessage =
      error?.message as keyof typeof ErrorResponseToMessageMap

    switch (errorMessage) {
      case "INVALID_TOKEN":
        setRedirect({ to: "/connexion", label: "Connexion" })

        setTimeout(() => {
          removeToken()
          dispatch(removeUser())
          dispatch(resetGame())
          navigate("/connexion")
        }, 5000)
        break
      case "CLOSED_GAME":
        setRedirect({ to: "/resultats", label: "Voir les résultats" })
        break
      default:
        setRedirect({ to: "/", label: "Retourner à la page d'accueil" })
    }

    setErrorMessage(
      ErrorResponseToMessageMap[errorMessage] ??
        ErrorResponseToMessageMap.DEFAULT,
    )
  }

  return (
    <p className=" mt-4 py-6 text-center text-gray-600 bg-red-100 border-red-300 border-y-2 font-semibold z-20">
      {errorMessage}
      <Link to={redirect.to}>
        <span className="underline text-pink-400 p-2">{redirect.label}</span>
      </Link>
    </p>
  )
}
