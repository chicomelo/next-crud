import firebase from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

interface ClienteFirestore {
    nome: string;
    idade: number;
}

export default class ColecaoCliente implements ClienteRepositorio {
    
    #conversor: firebase.firestore.FirestoreDataConverter<Cliente> = {
        toFirestore: (cliente: Cliente): firebase.firestore.DocumentData => {
            return {
                nome: cliente.nome,
                idade: cliente.idade
            };
        },
        fromFirestore: (
            snapshot: firebase.firestore.QueryDocumentSnapshot,
            options: firebase.firestore.SnapshotOptions
        ): Cliente => {
            const dados = snapshot.data(options);
            return new Cliente(dados.nome, dados.idade, snapshot.id);
        }
    };
    
    async salvar(cliente: Cliente | { nome: string; idade: number }): Promise<Cliente> {
        const clienteParaSalvar = cliente instanceof Cliente 
            ? cliente 
            : new Cliente(cliente.nome, cliente.idade);
        
        if (clienteParaSalvar.id) {
            // Atualização - usamos diretamente o conversor
            await this.colecao().doc(clienteParaSalvar.id).set(clienteParaSalvar);
            return clienteParaSalvar;
        } else {
            // Criação - usamos diretamente o conversor
            const docRef = await this.colecao().add(clienteParaSalvar);
            const doc = await docRef.get();
            return doc.data() || new Cliente('', 0, doc.id);
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        if (!cliente.id) throw new Error("Não é possível excluir um cliente sem ID");
        await this.colecao().doc(cliente.id).delete();
    }

    async obterTodos(): Promise<Cliente[]> {
        const query = await this.colecao().get();
        return query.docs.map(doc => doc.data() || new Cliente('', 0, doc.id));
    }

    private colecao() {
        return firebase.firestore()
            .collection('clientes')
            .withConverter(this.#conversor);
    }
}