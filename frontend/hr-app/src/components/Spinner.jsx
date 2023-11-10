import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import spinner from "../assets/Blocks-loading-transparent.svg"


const Spinner = (props) => {

    const { show } = props;

    Spinner.propTypes = {
        show: PropTypes.bool.isRequired
    }

    return (
        <>
            {
                show ?
                    createPortal(
                        <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-slate-500 bg-opacity-80'>
                            <div className='top-[50%] fixed left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                                <img alt="spinner" src={spinner}></img>
                            </div>
                        </div>
                        ,
                        document.getElementById("spinnerScreen"))
                    :
                    <></>
            }
        </>
    )
}
export default Spinner