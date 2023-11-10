
import Header from "./components/Header"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Career from "./pages/career/Career"
import FormInputResume from "./pages/career/FormInputResume"
import FormUploadResume from "./pages/career/FormUploadResume"
import CanditateScreening from "./pages/canditatescreening/CanditateScreening"
import { UserProvider } from "./contexts/userContext"
import useThemeMode from "./utils/hooks/useThemeMode"
import { THEME_STATE } from "./utils/constants"

import "./styles/global.css"
import "react-toastify/dist/ReactToastify.css";


import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const App = () => {

    const { themeMode } = useThemeMode();
    return (
        <UserProvider>
            <main className="bg-gradient-to-t from-secondary-light to-fourthy-light dark:from-primary-dark dark:to-secondary-dark h-screen overflow-auto">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/career">
                        <Route index element={<Career />} />
                        <Route path="forminput" element={<FormInputResume />} />
                        <Route path="formupload" element={<FormUploadResume />} />
                    </Route>
                    <Route path="/canditatescreen" element={<CanditateScreening />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    limit={3}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={themeMode === THEME_STATE.DARK ? "dark" : "light"}
                />
            </main>
        </UserProvider>
    )
}
export default App