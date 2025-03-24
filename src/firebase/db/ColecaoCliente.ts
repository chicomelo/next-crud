import firebase from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {
    
    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade
            };
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot.data(options);
            return new Cliente(dados.nome, dados.idade, snapshot.id);
        }
    }
    
    async salvar(cliente: Cliente): Promise<Cliente> {
        const clienteData = this.#conversor.toFirestore(cliente);
        if (cliente?.id) {
            await this.colecao().doc(cliente.id).set(clienteData);
            return cliente;
        } else {
            const docRef = await this.colecao().add(clienteData);
            const doc = await docRef.get();
            return this.#conversor.fromFirestore(doc, {}); // Passar as opções corretas se necessário
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        await this.colecao().doc(cliente.id).delete();
    }

    async obterTodos(): Promise<Cliente[]> {
        const querySnapshot = await this.colecao().get();
        return querySnapshot.docs.map(doc => this.#conversor.fromFirestore(doc, {})); // Passar as opções corretas se necessário
    }

    private colecao() {
        return firebase.firestore()
            .collection('clientes')
            .withConverter(this.#conversor);
    }
}