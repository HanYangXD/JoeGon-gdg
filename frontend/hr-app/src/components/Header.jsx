import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"

import useMediaQuery from '../utils/hooks/useMediaQuery'
import useThemeMode from "../utils/hooks/useThemeMode";
import { THEME_STATE, THEME_OPTIONS, USER_ROLES } from "../utils/constants";
import ModalSwitchAccount from "./ModalSwitchAccount";
import UserContext from "../contexts/userContext";

const Header = () => {

    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isModalOpened, setIsModalOpened] = useState(false);

    const { isMobile } = useMediaQuery();
    const { themeMode, setTheme } = useThemeMode();
    const [jgToken,] = useContext(UserContext);

    function handleOnThemeChange(e) {

        switch (e.target.id) {
            case "light-mode-icon":
                setTheme(THEME_STATE.DARK);
                break;
            case "dark-mode-icon":
                setTheme(THEME_STATE.LIGHT);
                break;
            default:
                setTheme(e.target.value);
                break;
        }

    }

    return (
        <header className="bg-white dark:bg-primary-dark py-1 ">
            <nav className="flex justify-between items-center w-[92%] mx-auto dark:text-white">
                <div className="font-[Agbalumo]">
                    JoeGon
                </div>
                <div className={`flex duration-100 w-full items-center px-5 absolute bg-white dark:bg-primary-dark min-h-[30vh] left-0 ${isMenuOpened ? "top-[2.5em]" : "top-[-100em]"} md:static md:min-h-fit md:w-auto`}>
                    <ul className="md:flex-row md:items-center md:gap-[4vw] flex flex-col gap-2 ">
                        <li><NavLink onClick={(e) => setIsMenuOpened(false)} className={"hover:text-blue-400"} to="/">Home</NavLink></li>
                        {
                            (jgToken.userRole === USER_ROLES.HR || jgToken.userRole === USER_ROLES.ADMIN) &&
                            <li><NavLink onClick={(e) => setIsMenuOpened(false)} className={"hover:text-blue-400"} to="/canditatescreen">Canditates Screening</NavLink></li>
                        }
                        {
                            (jgToken.userRole === USER_ROLES.CANDITATE || jgToken.userRole === USER_ROLES.ADMIN) &&
                            <li><NavLink onClick={(e) => setIsMenuOpened(false)} className={"hover:text-blue-400"} to="/career">Career</NavLink></li>
                        }
                        {
                            isMobile &&
                            <>
                                <hr />
                                <div className="flex gap-2 items-center">
                                    Switch theme {" "}
                                    <span>
                                        <select
                                            id="select-mode"
                                            className="dark:bg-primary-dark"
                                            value={themeMode}
                                            onChange={handleOnThemeChange} >
                                            {THEME_OPTIONS.map(o => (
                                                <option key={o.value} value={o.value}>{o.label}</option>
                                            ))}
                                        </select>
                                    </span>
                                </div>
                            </>
                        }

                    </ul>

                </div>
                {/* If not login, then need to show  */}
                <div className="flex flex-row items-center gap-5">
                    <div className="flex items-center gap-6">
                        <button
                            title="Switch Account Button"
                            onClick={() => setIsModalOpened(true)}
                            className={`bg-secondary-light dark:bg-secondary-dark text-white px-5 py-1 rounded-full hover:bg-[#87acec] md:text-base text-xs`}>Switch Account</button>
                        <i onClick={() => setIsMenuOpened(!isMenuOpened)} onKeyDown={() => setIsMenuOpened(!isMenuOpened)} className={`icon ${isMenuOpened ? "ion-md-close" : "ion-md-menu"} text-3xl cursor-pointer md:hidden`}></i>
                    </div>
                    <ModalSwitchAccount isOpened={isModalOpened} onClose={() => setIsModalOpened(false)} />
                    {
                        !isMobile &&
                        <button
                            title="Theme Mode Button"
                            onClick={handleOnThemeChange}
                            className="rounded-full px-1.5 border-2 border-secondary-light text-secondary-light dark:border-secondary-dark dark:text-white border-solid h-auto">
                            {
                                themeMode === THEME_STATE.DARK ?
                                    <i id="dark-mode-icon" className="icon ion-md-moon"></i>
                                    :
                                    <i id="light-mode-icon" className="icon ion-md-sunny"></i>
                            }


                        </button>

                    }

                </div>
            </nav>

        </header>

    )
}
export default Header