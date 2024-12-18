import React, {useEffect} from "react";
import PropTypes from "prop-types";
import style from './style.module.scss';

const ModalWrapper = ({children, onClick}) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClick();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClick]);

    return (
        <div className={style.modalWrapper} onClick={onClick}>
            {children}
        </div>
    );
};

ModalWrapper.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func.isRequired
};

export default ModalWrapper;
