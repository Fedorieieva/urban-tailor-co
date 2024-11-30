import React from "react";
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
        underline,
        uppercase,
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
            [styles.uppercase]: uppercase,
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

export default Typography;
