interface BotaoProps{
    children: any
    cor?: 'green' | 'blue' | 'gray'
    className?: string
    onClick?: () => void
}

export default function Botao(props: BotaoProps){
    const cor = props.cor ? props.cor : 'gray'
    return (
        <button onClick={props.onClick} className={`
            bg-gradient-to-tr from-${cor}-300 to-${cor}-600
            text-white px-4 py-2 rounded-md cursor-pointer 
            ${props.className}
        `}>
            {props.children}
        </button>
    )
}