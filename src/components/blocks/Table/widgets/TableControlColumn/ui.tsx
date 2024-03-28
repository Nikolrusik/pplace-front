import classNames from "classnames";
import "./TableControlColumn.scss"
import { TTableControlColumn } from "./types";
import React, { SVGAttributes, useState } from "react";


const Caret: React.FC<SVGAttributes<SVGElement>> = (props) => {
    const { children, ...rest } = props
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" {...rest} >
            {children}
            <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
        </svg >
    )
}
const TableControlColumn: React.FC<TTableControlColumn> = (props) => {
    const {
        name,
        settings,
        onClick,
        parentColumn,
        className,
        isParent = true,
        isSelected = false
    } = props;

    const [openChild, setIsOpenChild] = useState(false)

    const handleClick = (event: React.FormEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClick(parentColumn, isParent ? null : name, setIsOpenChild)
    }

    return (
        <div
            className={classNames(className, "headcontrol_column", {
                'is-child': !isParent,
                'is-open': openChild,
                'is-selected': isSelected
            })}
            onClick={handleClick}>
            {typeof settings === "object" ? (
                <>
                    {openChild &&
                        <div className={classNames("headcontrol_column__child")}>
                            {Object.keys(settings).map((subColumn: string, index: number) => (
                                <TableControlColumn
                                    key={index}
                                    name={subColumn}
                                    settings={settings[subColumn]}
                                    onClick={onClick}
                                    parentColumn={parentColumn}
                                    isParent={false}
                                    isSelected={settings[subColumn]}
                                />
                            ))}
                        </div>
                    }
                    <span className={classNames("headcontrol_column__name", {
                        'is-selected': isSelected
                    })}>
                        <Caret className="column-caret" /> {parentColumn ? parentColumn : null}
                    </span>

                </>
            ) : (
                <span className={classNames("headcontrol_column__name", {
                    'is-selected': isSelected
                })}>
                    {name}
                </span>
            )}
        </div>
    );
};

export default TableControlColumn
