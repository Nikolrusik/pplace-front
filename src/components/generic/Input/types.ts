import { InputHTMLAttributes } from "react";


export type TInput = InputHTMLAttributes<HTMLInputElement> & {
    className?: string
}