export default class Cliente {
    #id: string | null  // Removemos o undefined pois já temos null como padrão
    #nome: string
    #idade: number

    constructor(nome: string, idade: number, id: string | null = null) {
        this.#nome = nome
        this.#idade = idade
        this.#id = id
    }

    static vazio() {
        return new Cliente('', 0)
    }

    get id() {
        return this.#id
    }

    get nome() {
        return this.#nome
    }

    get idade() {
        return this.#idade
    }

    // Adicionar método para criar um objeto simples
    toJSON() {
        return {
            nome: this.#nome,
            idade: this.#idade,
            ...(this.#id && { id: this.#id })
        }
    }
}