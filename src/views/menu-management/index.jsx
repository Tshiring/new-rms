import { ADD_MENU } from "@/router/path"
import { Link } from "react-router"

const MenuManagement = () => {
  return (
    <div>MenuManagement
        <div>
            <Link to={ADD_MENU}>Add Menu Item</Link>
        </div>
    </div>
  )
}

export default MenuManagement