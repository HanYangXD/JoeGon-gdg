import Select from 'react-select';
import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { USER_OPTIONS, USER_ROLES } from "../utils/constants";
import UserContext from '../contexts/userContext';

const ModalSwitchAccount = ({ isOpened, onClose }) => {

  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userRoleShortForm, setUserRoleShortForm] = useState("");
  const navigate = useNavigate();
  const [jgToken, setJGToken] = useContext(UserContext);

  ModalSwitchAccount.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }


  useEffect(() => {

    switch (userRole) {
      case USER_ROLES.ADMIN:
        setUserRoleShortForm("AD");
        break;
      case USER_ROLES.HR:
        setUserRoleShortForm("HR");
        break;
      default:
        setUserRoleShortForm("CA");
        break;
    }

  }, [userRole]);

  useEffect(() => {
    setUserId(jgToken.userId.slice(2));
    setUserRole(jgToken.userRole);

  }, [jgToken])


  function handleOnClick() {

    if (!userRoleShortForm || !userId || !userRole) return;

    setJGToken({ userId: userRoleShortForm + userId, userRole: userRole });
    onClose();
    navigate("/");
  }

  if (!isOpened) return null;
  return createPortal(
    <div className="absolute backdrop-blur-sm inset-0 transition-colors">

      <div className="fixed left-[50%] translate-x-[-50%] translate-y-[30%] h-auto w-auto bg-secondary-light dark:bg-primary-dark p-10 rounded-lg">
        <span className="absolute top-5 right-5 font-bold cursor-pointer dark:text-fourthy-dark" onClick={onClose} onKeyDown={onClose}>
          X
        </span>
        <div className='flex items-center flex-col gap-5 '>
          <div className='flex justify-items-start flex-col gap-5'>
            <Select
              required
              defaultValue={USER_OPTIONS.find(o => o.label === userRole)}
              options={USER_OPTIONS}
              onChange={(e) => setUserRole(e.label)}
            />
            <div className="flex items-center gap-1">
              <label className="font-bold dark:text-fourthy-dark">{userRoleShortForm}</label>
              <input
                type="number"
                required
                onChange={(e) => setUserId(e.target.value)}
                defaultValue={userId}
                placeholder="UserId" />
            </div>

          </div>
          <button
            title="Save Button"
            className="rounded-lg px-5 py-2 bg-primary-light dark:bg-purple-dark dark:text-white" onClick={handleOnClick}>Save</button>
        </div>
      </div>

    </div>
    ,
    document.getElementById("switchAccountModal")
  )
}
export default ModalSwitchAccount