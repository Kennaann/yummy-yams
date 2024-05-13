import { DICES_DOTS_MAP } from "../../utils/game.utils"

type DiceProps = {
  numberIndex: number
}

export const Dice = ({ numberIndex }: DiceProps) => {
  return (
    <div className="h-16 w-16 bg-white rounded-xl shadow-md flex justify-between p-4">
      {DICES_DOTS_MAP[numberIndex].map((combination, index) => {
        return (
          <div key={index} className="space-y-[6px]">
            {combination.map((dot, index) => {
              return (
                <div
                  key={index}
                  className={`w-2 h-2 bg-${dot ? "black" : "white"} rounded-full`}
                ></div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
