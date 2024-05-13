import { useEffect, useState } from "react"
import { Win } from "../../types/results.types"
import { get } from "../../utils/api.utils"

export const ResultsTable = () => {
  const [results, setResults] = useState<Win[]>([])

  useEffect(() => {
    const getResults = async () => {
      const { error, data } = await get<Win[]>("/leaderboard/wins")

      if (error) {
        return console.error(error)
      }
      setResults(data!)
    }

    getResults()
  }, [])

  const getLocalDateTime = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  return (
    <div className="overflow-hidden rounded-lg mt-4 md:mt-8">
      <table className="w-full text-sm text-left rtl:text-right text-gray-600">
        <thead className="text-xs text-white uppercase bg-slate-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Gagnant
            </th>

            <th scope="col" className="px-6 py-3">
              Patisseries
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map(({ winner, createdAt, prize, _id }) => (
            <tr
              key={_id}
              className="odd:bg-slate-200  even:bg-slate-50 border-b last:border-b-0  border-slate-100"
            >
              <th
                scope="row"
                className="p-4 md:px-6 font-medium text-slate-900 whitespace-nowrap"
              >
                {winner.username}
              </th>
              <td className="p-4">
                <ul className="space-y-2">
                  {prize.map(pastry => (
                    <li key={pastry._id}>{pastry.name}</li>
                  ))}
                </ul>
              </td>
              <td className="p-4">{getLocalDateTime(createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
