import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const NotFound = () => {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/") // if write '-1' go back previous page
    }, 1000)
  }, [navigate])

  return (
    <div>404 Page NotFound. Redirect to home page soon...</div>
  )
}
export default NotFound