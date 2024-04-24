import { Logo } from "../components/core/LogoComponent"

interface AuthPageProps {
  Form: React.FC
}

export const AuthPage = ({ Form }: AuthPageProps) => {
  return (
    <>
      <Logo />
      <div className="flex flex-col items-center justify-center h-screen absolute inset-0">
        <Form />
      </div>
    </>
  )
}
