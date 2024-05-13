import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Button } from "../components/core/ButtonComponent"
import { getYamsResults, getYamsThrow } from "../features/gameSlice"
import { useEffect, useState } from "react"
import { selectUser } from "../features/userSlice"
import { useNavigate } from "react-router-dom"
import { Logo } from "../components/core/LogoComponent"
import { Dice } from "../components/game/Dice"
import { ErrorBanner } from "../components/game/ErrorBannerComponent"
import { Result } from "../components/game/ResultComponent"

export const YamsPage = () => {
  const dispatch = useAppDispatch()
  const throwData = useAppSelector(getYamsThrow)
  const error = useAppSelector(state => state.game.error)
  const user = useAppSelector(selectUser)
  const [numberIndexes, setNumberIndexes] = useState<number[]>([1, 3, 2, 0, 4])
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate("/connexion")
    if (throwData) return setNumberIndexes(throwData.result.dices)
  }, [throwData, error])

  const getResults = async () => {
    await dispatch(getYamsResults())
  }

  return (
    <>
      <Logo />

      {error && <ErrorBanner />}

      <div className="flex flex-col items-center justify-center mt-56">
        {throwData && <Result />}

        <div className="flex space-x-4">
          {numberIndexes.map((number, index) => (
            <Dice key={index} numberIndex={number} />
          ))}
        </div>

        {(!throwData || !!throwData.attempts) && (
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
