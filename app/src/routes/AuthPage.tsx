import { useAppSelector } from "../app/hooks"
import { ErrorToaster } from "../components/core/ErrorToasterComponent"
import { Logo } from "../components/core/LogoComponent"
import { getAuthErrorMessage } from "../utils/auth.utils"

interface AuthPageProps {
  Form: React.FC
}

export const AuthPage = ({ Form }: AuthPageProps) => {
  const error = useAppSelector(state => state.user.error)

  return (
    <>
      <Logo />
      <ErrorToaster
        message={error && getAuthErrorMessage(error.message, error.errors)}
      />
      <div className="flex flex-col items-center justify-center h-screen absolute inset-0">
        <Form />
      </div>
    </>
  )
}
