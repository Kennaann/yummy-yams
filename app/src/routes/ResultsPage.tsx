import { Logo } from "../components/core/LogoComponent"

export const ResultsPage = () => {
  return (
    <>
      <Logo />

      <div className="m-4 md:w-3/5 md:mx-auto mt-10 md:mt-16">
        <h1 className="text-2xl md:text-3xl font-semibold text-center">
          🏆 Les gagnants 🏆
        </h1>

        <div className="overflow-hidden rounded-lg mt-4">
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
              <tr className="odd:bg-slate-200  even:bg-slate-50 border-b last:border-b-0  border-slate-100">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap"
                >
                  User1
                </th>
                <td className="px-6 py-4">
                  <ul className="space-y-2">
                    <li>Flan</li>
                    <li>Tarte</li>
                    <li>Croissant</li>
                  </ul>
                </td>
                <td className="px-6 py-4">12 juillet 1999, 12:00</td>
              </tr>
              <tr className="odd:bg-slate-200  even:bg-slate-50 border-b last:border-b-0  border-slate-100">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap"
                >
                  User1
                </th>
                <td className="px-6 py-4">
                  <ul className="space-y-2">
                    <li>Flan</li>
                    <li>Tarte</li>
                    <li>Croissant</li>
                  </ul>
                </td>
                <td className="px-6 py-4">12 juillet 1999, 12:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
