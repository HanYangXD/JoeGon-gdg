import { NavLink } from "react-router-dom";

const CardSelectSubmitResume = (props) => {

    const { cardItem, navigateTo, disabled = false } = { ...props };

    function handleOnClick(e) {
        if (disabled)
            e.preventDefault();
    }

    return (
        <div className="flex items-center flex-col w-full">
            <div className="card_item dark:bg-primary-dark bg-primary-light text-black md:max-w-sm max-w-full w-full  py-4 px-8  shadow-lg rounded-lg my-20 relative">
                <div className="flex">
                    <div className="flex items-center flex-col w-full">
                        <h1 className="text-lg dark:text-white ">{cardItem?.title}</h1>

                        <section className="pb-7">
                            <NavLink onClick={handleOnClick} to={navigateTo} className=" h-14 text-black dark:text-white text-base font-bold py-2 px-4 rounded-lg w-full flex items-center justify-center gap-4">
                                <i className={`${cardItem?.icon} `}></i>
                                <span> {cardItem?.btnText} </span>
                            </NavLink>
                        </section>
                    </div>
                </div>

            </div>
        </div >

    )
}
export default CardSelectSubmitResume