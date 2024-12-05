
export type ButtonPropsType = {
    className?: string
    onClick?: () => void
    title: string
}

export const Button = ({title, onClick, className}: ButtonPropsType) => {
    return (
        <button className={className} onClick={onClick}>{title}</button>
    )
}