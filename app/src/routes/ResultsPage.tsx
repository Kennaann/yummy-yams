import { Logo } from "../components/core/LogoComponent"
import { ResultsTable } from "../components/results/ResultsTableComponent"

export const ResultsPage = () => {
  return (
    <>
      <Logo />

      <div className="m-4 md:w-3/5 md:mx-auto mt-10 md:mt-16">
        <h1 className="text-2xl md:text-3xl font-semibold text-center">
          🏆 Les gagnants 🏆
        </h1>

        <ResultsTable />
      </div>
    </>
  )
}
