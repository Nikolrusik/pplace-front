import "./Select.scss"
import React from "react"
import { TSelect } from "./types"
import classNames from "classnames"


const Select: React.FC<TSelect> = (props) => {
    const {
        className,
        options,
        children,
        ...rest
    } = props

    return (
        <select className={classNames(className, 'select')} {...rest}>
            {children}
        </select>
    )
}

export default Select