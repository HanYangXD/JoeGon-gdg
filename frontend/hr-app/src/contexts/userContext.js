// Refer from: https://www.youtube.com/watch?v=hn-c0u2mDIQ

import { createContext, useMemo } from "react";
import PropTypes from 'prop-types';

import { INITIAL_USER_TOKEN } from "../utils/constants";
import useSessionStorage from "../utils/hooks/useSessionStorage";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    UserProvider.propTypes = {
        children: PropTypes.object.isRequired,
    }

    const [jgToken, setJGToken] = useSessionStorage("JG-Token", INITIAL_USER_TOKEN);
    
    console.time("memoo time")
    const obj = useMemo(() => (
        
        [jgToken, setJGToken]
    
    ), [jgToken, setJGToken]);
    console.timeEnd("memoo time")

    return (
        <UserContext.Provider value={obj}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;