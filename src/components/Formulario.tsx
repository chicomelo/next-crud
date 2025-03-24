import { useState } from "react";
import Cliente from "../core/Cliente";
import Entrada from "./Entrada";
import Botao from "./Botao";

interface FormularioProps {
    cliente: Cliente
    cancelado?: () => void
    clienteMudou?: (cliente: Cliente) => void
}


export default function Formulario(props: FormularioProps) {

    const id = props.cliente?.id
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0)
    return(
        <div>
            {
                id ? (
                    <Entrada 
                        somenteLeitura
                        texto="Código" 
                        valor={id} 
                        className="mb-4"
                    />
                ) : false
            }
            <Entrada 
                texto="Nome" 
                valor={nome}
                valorMudou={setNome}
                className="mb-4"
            />
            <Entrada 
                texto="Idade" 
                tipo="number" 
                valor={idade}
                valorMudou={setIdade}
            />
            <div className="mt-4 flex justify-end gap-2">

                <Botao cor="gray" onClick={props.cancelado} className="from-gray-300 to-gray-600">
                    Cancelar
                </Botao>
                <Botao cor="blue" 
                    className="from-blue-300 to-blue-600"
                    onClick={
                        () => props.clienteMudou?.(new Cliente(nome, +idade, id))
                    }>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
            </div>
        </div>
    )
}