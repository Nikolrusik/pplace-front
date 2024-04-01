import "./Input.scss"
import React from "react";
import { TInput } from "./types";
import classNames from "classnames";


const Input: React.FC<TInput> = (props) => {
    const {
        className,
        type = 'text',
        ...rest
    } = props
    return (
        <input className={classNames(className, 'input')} type={type} {...rest} />
    )
}

export default Input