import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { removeToken } from "../utils/jwt.utils"
import { useAppDispatch } from "../app/hooks"
import { removeUser } from "../features/userSlice"

export const LogoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    removeToken()
    dispatch(removeUser())
    navigate("/")
  }, [])

  return null
}
