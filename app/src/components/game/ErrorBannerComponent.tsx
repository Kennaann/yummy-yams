import { Link, useNavigate } from "react-router-dom"
import { GameState, resetGame } from "../../features/gameSlice"
import { useEffect, useState } from "react"
import { ErrorResponseToMessageMap } from "../../types/game.types"
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
    if (error!.code !== 403) {
      setErrorMessage(ErrorResponseToMessageMap.DEFAULT)
      setRedirect({ to: "/", label: "retour à la page d'accueil" })
      return
    }

    const errorMessage =
      error?.message as keyof typeof ErrorResponseToMessageMap

    switch (errorMessage) {
      case "INVALID_TOKEN":
        setRedirect({ to: "/connexion", label: "connexion" })

        setTimeout(() => {
          removeToken()
          dispatch(removeUser())
          dispatch(resetGame())
          navigate("/connexion")
        }, 5000)
        break
      case "CLOSED_GAME":
        setRedirect({ to: "/resultats", label: "voir les résultats" })
        break
      default:
        setRedirect({ to: "/", label: "retour à la page d'accueil" })
    }

    setErrorMessage(
      ErrorResponseToMessageMap[errorMessage] ??
        ErrorResponseToMessageMap.DEFAULT,
    )
  }

  return (
    <p className=" mt-4 py-6 text-center bg-red-200 rounded-lg font-semibold z-20">
      {errorMessage}
      <Link to={redirect.to}>
        <span className="underline text-pink-400 p-2">{redirect.label}</span>
      </Link>
    </p>
  )
}
