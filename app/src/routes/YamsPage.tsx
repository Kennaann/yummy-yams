import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Button } from "../components/core/ButtonComponent"
import {
  GameState,
  getYamsResults,
  resetGame,
  getYamsThrow,
} from "../features/gameSlice"
import { useEffect, useState } from "react"
import { removeToken } from "../utils/jwt.utils"
import { removeUser, selectUser } from "../features/userSlice"
import { Link, useNavigate } from "react-router-dom"
import {
  ErrorResponseToMessageMap,
  PrizeStatus,
  YamsThrow,
} from "../types/game.types"
import { Logo } from "../components/core/LogoComponent"
import { Dice } from "../components/game/Dice"

export const YamsPage = () => {
  const dispatch = useAppDispatch()
  const throwData = useAppSelector(getYamsThrow)
  const error = useAppSelector(state => state.game.error)
  const user = useAppSelector(selectUser)
  const [errorMessage, setErrorMessage] = useState("")
  const [redirect, setRedirect] = useState({ to: "", label: "" })
  const [numberIndexes, setNumberIndexes] = useState<number[]>([1, 3, 2, 0, 4])
  const [prizeStatus, setPrizeStatus] = useState<PrizeStatus>({
    message: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/connexion")
    }

    if (throwData) {
      return handleGameResult(throwData.result)
    }

    if (error) {
      return handleErrors(error)
    }
  }, [throwData, error])

  const handleErrors = (error: GameState["error"]) => {
    if (error!.code !== 403) {
      setErrorMessage(ErrorResponseToMessageMap.DEFAULT)
      setRedirect({ to: "/", label: "retour à la page d'accueil" })
      return
    }

    const errorMessage =
      error?.message as keyof typeof ErrorResponseToMessageMap

    if (errorMessage === "INVALID_TOKEN") {
      removeToken()
      dispatch(removeUser())
      dispatch(resetGame())
      setErrorMessage(ErrorResponseToMessageMap.INVALID_TOKEN)
      setRedirect({ to: "/connexion", label: "connexion" })
      setTimeout(() => navigate("/connexion"), 5000)
      return
    }

    setErrorMessage(ErrorResponseToMessageMap[errorMessage])
    setRedirect({ to: "/", label: "retour à la page d'accueil" })
  }

  const handleGameResult = (result: YamsThrow["result"]) => {
    setNumberIndexes(result.dices)

    switch (result.combination) {
      case "YAMS":
        setPrizeStatus({
          message: "🥳 YAMS ! 🥳",
          prize: throwData!.pastries,
        })
        break
      case "SQUARE":
        setPrizeStatus({
          message: "🥳 Carré ! 🥳 ",
          prize: throwData!.pastries,
        })
        break
      case "DOUBLE":
        setPrizeStatus({
          message: "🥳 Double ! 🥳 ",
          prize: throwData!.pastries,
        })
        break
      case "NOTHING":
        setPrizeStatus({
          message: "Rien 💀",
        })
        break
    }
  }

  const getResults = async () => {
    if (error) {
      return handleErrors(error)
    }
    await dispatch(getYamsResults())
  }

  return (
    <>
      <Logo />

      {errorMessage && (
        <p className=" mt-4 py-6 text-center bg-red-200 rounded-lg font-semibold z-20">
          {errorMessage}
          <Link to={redirect.to}>
            <span className="underline text-pink-400 p-2">
              {redirect.label}
            </span>
          </Link>
        </p>
      )}

      <div className="flex flex-col items-center justify-center mt-56">
        {prizeStatus.message && (
          <div className="mb-20">
            <h2 className="text-3xl text-slate-800 font-semibold text-center ">
              {prizeStatus.message}
            </h2>

            {prizeStatus.prize ? (
              <div className="flex flex-col items-center mt-12">
                <div className="flex gap-3 md:gap-4 mb-2">
                  {prizeStatus.prize?.map(pastry => (
                    <img
                      key={pastry.id}
                      src={`assets/${pastry.image}`}
                      alt={pastry.name}
                      className="w-28 md:h-40 h- md:w-40 rounded-md -translate-y-3 first:translate-y-0 last:translate-y-0 hover:translate-x-0 hover:translate-y-0  hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                    />
                  ))}
                </div>
                <Button
                  type="primary"
                  label="Réclamer"
                  onClick={() => console.log(prizeStatus.prize)}
                />
              </div>
            ) : (
              <p className="text-center mt-4">
                {throwData?.attempts} essais restants
              </p>
            )}
          </div>
        )}
        <div>
          <p></p>
        </div>
        <div className="flex space-x-4">
          {numberIndexes.map((number, index) => (
            <Dice key={index} numberIndex={number} />
          ))}
        </div>

        {!prizeStatus.prize && (
          <Button
            type="primary"
            label="Lancer"
            onClick={getResults}
            disabled={!!error}
          />
        )}
      </div>
    </>
  )
}
