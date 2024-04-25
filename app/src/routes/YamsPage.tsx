import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Button } from "../components/core/ButtonComponent"
import {
  GameState,
  getYamsResults,
  selectYamsResult,
} from "../features/gameSlice"
import { useEffect, useState } from "react"
import { removeToken } from "../utils/jwt.utils"
import { removeUser, selectUser } from "../features/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { ErrorResponseToMessageMap } from "../types/game.types"

export const YamsPage = () => {
  const dispatch = useAppDispatch()
  const result = useAppSelector(selectYamsResult)
  const error = useAppSelector(state => state.game.error)
  const user = useAppSelector(selectUser)
  const [errorMessage, setErrorMessage] = useState("")
  const [redirect, setRedirect] = useState({ to: "", label: "" })
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/connexion")
    }
  }, [navigate])

  const handleErrors = (error: GameState["error"]) => {
    if (error!.code !== 403) {
      setErrorMessage(ErrorResponseToMessageMap.DEFAULT)
      setRedirect({ to: "/", label: "retour à la page d'accueil" })
      return
    }

    const errorMessage =
      error?.message as keyof typeof ErrorResponseToMessageMap

    if (errorMessage === ErrorResponseToMessageMap.INVALID_TOKEN) {
      removeToken()
      dispatch(removeUser())
      setErrorMessage(ErrorResponseToMessageMap.INVALID_TOKEN)
      setRedirect({ to: "/connexion", label: "page de connexion" })
      setTimeout(() => navigate("/connexion"), 5000)
      return
    }

    setErrorMessage(ErrorResponseToMessageMap[errorMessage])
    setRedirect({ to: "/", label: "retour à la page d'accueil" })
  }

  const getResults = async () => {
    await dispatch(getYamsResults())

    if (error) {
      handleErrors(error)
      return
    }

    console.log(result!)
  }

  return (
    <div>
      {errorMessage && (
        <p>
          {errorMessage}
          <Link to={redirect.to}>
            <span className="underline text-pink-400 p-2">
              {redirect.label}
            </span>
          </Link>
        </p>
      )}
      <Button type="primary" label="Lancer les dés" onClick={getResults} />
    </div>
  )
}
