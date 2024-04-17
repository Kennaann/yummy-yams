import { useAppSelector, useAppDispatch } from "../../app/hooks"

export const PastriesList = () => {
  const pastries = useAppSelector(state => state.pastries)
  const dispatch = useAppDispatch()

  return (
    <ul>
      {pastries.map(pastry => (
        <li key={pastry.id}>
          <img
            src={`public/assets/${pastry.image}`}
            alt={pastry.name}
            height="100px"
          />
          <p>{pastry.name}</p>
        </li>
      ))}
    </ul>
  )
}
