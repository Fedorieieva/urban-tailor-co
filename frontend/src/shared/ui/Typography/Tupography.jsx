import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./style.module.scss";
import { tagMap } from "./typography.config";

const Typography = (props) => {
    const {
        children,
        className = "",
        style,
        variant = "body",
        tag,
        bold,
        mediumBold,
        colored,
        black,
        underline,
        uppercase,
        capitalize,
        fullWidth,
        goldUnderline,
        isError = false,
        ...restProps
    } = props;

    const Tag = tag || tagMap[variant];

    const typographyClasses = cn(
        styles[variant],
        {
            [styles.bold]: bold,
            [styles.mediumBold]: mediumBold,
            [styles.underline]: underline,
            [styles.colored]: colored,
            [styles.black]: black,
            [styles.uppercase]: uppercase,
            [styles.capitalize]: capitalize,
            [styles.fullWidth]: fullWidth,
            [styles.goldUnderline]: goldUnderline,
            [styles.error]: isError
        },
        className
    );

    return (
        <Tag className={typographyClasses} style={style} {...restProps}>
            {children}
        </Tag>
    );
};

Typography.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    variant: PropTypes.oneOf(Object.keys(tagMap)),
    tag: PropTypes.elementType,
    bold: PropTypes.bool,
    mediumBold: PropTypes.bool,
    colored: PropTypes.bool,
    black: PropTypes.bool,
    underline: PropTypes.bool,
    uppercase: PropTypes.bool,
    capitalize: PropTypes.bool,
    fullWidth: PropTypes.bool,
    goldUnderline: PropTypes.bool,
    isError: PropTypes.bool,
};

export default Typography;
