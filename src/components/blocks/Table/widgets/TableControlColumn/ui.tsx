import classNames from "classnames";
import "./TableControlColumn.scss"
import { TTableControlColumn } from "./types";
import React, { useState } from "react";



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
                    <span className={classNames("headcontrol_column__name", {
                        'is-selected': isSelected
                    })}>
                        {parentColumn ? parentColumn : null}
                    </span>
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
