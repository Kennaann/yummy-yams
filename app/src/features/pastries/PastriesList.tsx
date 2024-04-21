import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getPastries, selectAllPastries } from "./pastriesSlice"

export const PastriesList = () => {
  const dispatch = useAppDispatch()

  const pastries = useAppSelector(selectAllPastries)
  const pastriesStatus = useAppSelector(state => state.pastries.status)

  useEffect(() => {
    if (pastriesStatus === "idle") {
      dispatch(getPastries())
    }
  }, [pastriesStatus, dispatch])

  const getContent = (): JSX.Element => {
    if (pastriesStatus === "succeeded") {
      return (
        <ul>
          {pastries.map(pastry => (
            <li key={pastry.id}>
              <img
                src={`/assets/${pastry.image}`}
                alt={pastry.name}
                height="100px"
              />
              <p className="font-sans">{pastry.name}</p>
            </li>
          ))}
        </ul>
      )
    }
    return <></>
  }

  return <div>{getContent()}</div>
}
