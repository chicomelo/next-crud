

export default function Titulo(props: any){
    return(
        <div className="flex flex-col justify-center">
            <h1 className="px-4 py-4 text-2xl font-bold">{props.children}</h1>
            <hr className="border-2 border-purple-500"/>
        </div>
    )
}