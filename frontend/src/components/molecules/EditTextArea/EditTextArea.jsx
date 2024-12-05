import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import style from './style.module.scss';
import Button from "../../atoms/Button/Button.jsx";
import Send from '../../../../public/images/icons/send.svg?react';
import cn from 'classnames';

const EditTextArea = ({content, setContent, onClick, isEditing, className}) => {
    const textAreaRef = useRef(null);

    useEffect(() => {
        const adjustHeight = () => {
            const textarea = textAreaRef.current;
            if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        };

        adjustHeight();
        window.addEventListener("resize", adjustHeight);

        return () => {
            window.removeEventListener("resize", adjustHeight);
        };
    }, [content]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onClick();
        }
    };

    return (
        <div className={cn(style.commentWrapper, className)}>
            <textarea
                className={style.comment}
                name="content"
                value={content}
                ref={textAreaRef}
                disabled={!isEditing}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={isEditing ? handleKeyDown : undefined}
            />

            {isEditing && (
                <Button
                    variant="transparent"
                    className={style.editCommentBtn}
                    onClick={onClick}
                >
                    <Send/>
                </Button>
            )}
        </div>
    );
};

EditTextArea.propTypes = {
    content: PropTypes.string,
    setContent: PropTypes.func,
    onClick: PropTypes.func,
    isEditing: PropTypes.bool,
    className: PropTypes.string
}

export default EditTextArea