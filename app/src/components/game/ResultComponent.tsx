import { useEffect, useState } from "react"
import { PrizeStatus, YamsThrow } from "../../types/game.types"
import { Button } from "../core/ButtonComponent"
import { useAppSelector } from "../../app/hooks"
import { getYamsThrow } from "../../features/gameSlice"

export const Result = () => {
  const throwData = useAppSelector(getYamsThrow)
  const error = useAppSelector(state => state.game.error)
  const [prizeStatus, setPrizeStatus] = useState<PrizeStatus>({
    message: "",
  })

  useEffect(() => {
    if (throwData) handleGameResult(throwData.result)
  }, [throwData])

  const handleGameResult = (result: YamsThrow["result"]) => {
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

  return (
    <div className="mb-20">
      <h2 className="text-3xl text-slate-800 font-semibold text-center ">
        {prizeStatus.message}
      </h2>

      {prizeStatus.prize && (
        <div className="flex flex-col items-center mt-12">
          <div className="flex gap-3 md:gap-4 mb-2">
            {prizeStatus.prize?.map(pastry => (
              <img
                key={pastry._id}
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
      )}
      {!error && !prizeStatus.prize && prizeStatus.message && (
        <p className="text-center mt-4">
          {throwData?.attempts} essais restants
        </p>
      )}
    </div>
  )
}
