import "./Button.scss"
import React from "react"
import { TButton } from "./types"
import classNames from "classnames"


const Button: React.FC<TButton> = (props) => {
    const {
        className,
        type = 'button',
        children,
        ...rest
    } = props

    return (
        <button
            className={classNames(className, 'button')}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button