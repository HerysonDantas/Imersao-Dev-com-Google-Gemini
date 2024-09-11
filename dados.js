/**
     * Representa um artigo.
     * @param {number} id - Identificador único do artigo.
     * @param {string} nome - Nome do artigo.
     * @param {string} descricao - Descrição detalhada do artigo.
     * @param {boolean} eComposto - Indica se o artigo é composto por outros itens.
     * @param {Array} componentes - Lista de componentes do artigo, se for composto.
     * @param {number} quantidadeEstoque - Quantidade do artigo em estoque.
     */
class artigos {
    constructor(id, nome, descricao, eComposto = false, componentes, quantidadeEstoque = 0) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.eComposto = eComposto;
        this.componentes = [];
        this.quantidadeEstoque = quantidadeEstoque;
    }


    // Adiciona um componente ao artigo
    adicionarComponente(componenteId, quantidadeComp) {

        // Verifica se o componente já existe na lista
        if (!Array.isArray(this.componentes)) {
            console.error("componentes não é um array");
            return;
        }

        const componenteExistente = this.componentes.find(c => c.id === componenteId);
        console.log(componenteExistente);


        if (componenteExistente) {
            // Se o componente já existe, atualiza a quantidade
            componenteExistente.quantidade = quantidadeComp;
        } else {
            // Se o componente não existe, adiciona à lista
            this.componentes.push({ id: componenteId, quantidade: quantidadeComp });
        }

        // Marca o artigo como composto
        this.eComposto = true;
    }

    // Remove um componente do artigo
    removerComponente(componenteId) {
        // Encontra o índice do componente na lista
        const index = this.componentes.findIndex(c => c.id === componenteId);

        // Se o componente foi encontrado, remove-o
        if (index !== -1) {
            this.componentes.splice(index, 1);

            // Verifica se o artigo ainda possui componentes
            if (this.componentes.length === 0) {
                this.eComposto = false;
            }
        }
    }
}

// Array para armazenar os artigos

const artigosDB = [
    new artigos(1, `Armário XL`, `Armário de cozinha 100cm X 60cm x 90cm`, false, 10),
    new artigos(2, `Tampo Armário XL`, `Tampo de Armário de cozinha 2cm X 100cm x 60cm`, false, [], 5),
    new artigos(3, `Ilharga Armário XL`, `Ilharga Armário de cozinha 2cm X 60cm x 90cm`, false, [], 20),
    new artigos(4, `Prateleira Armário XL`, `Prateleira Armário de cozinha 2cm X 96cm x 90cm`, false, [], 5),
    new artigos(5, `Fundo Armário XL`, `Fundo Armário de cozinha 2cm X 100cm x 90cm`, false, [], 5),
    new artigos(6, `Costas Armário XL`, `Costas Armário de cozinha 2cm X 98cm x 90cm`, false, [], 5),
    new artigos(7, `Pés Armário XL`, `Pés Armário de cozinha 2cm X 2cm x 10cm`, false, [], 200)
];
