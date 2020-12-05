<template>
  <b-container>
    <h5>{{ purchase.data }}</h5>
    <p v-if="status == 3">Situação: Compra finalizada</p>
    <p v-else>Situação: Aguardando confirmação</p>
    <p>Endereço: {{ purchase.endereco }}</p>
    <p>Produtos:</p>

    <b-list-group>
      <b-list-group-item
        v-for="item in purchase.itens"
        class="d-flex justify-content-between align-items-center"
      >
        {{ item.nome }}
        <b-badge variant="primary" pill>{{ item.quantidade }}</b-badge>
      </b-list-group-item>
    </b-list-group>

    <div>
      <b-button variant="primary" v-show="status == 2" @click="editarCompra()">Editar</b-button>
      <b-button variant="danger" @click="mensagemDeletar()">Excluir</b-button>
      <b-button variant="success" v-show="status == 1" @click="finalizarCompra()">Confirmar</b-button>
    </div>

    <p>Valor da compra: R${{ purchase.valor }}</p>

    <div class="confirmacaoExclusao" v-show="mostrarConfirmacao">
      <b-alert show variant="danger">
        <h6 class="alert-heading" v-if="status == 1 || 2">
          Deseja cancelar a compra?
        </h6>
        <h6 class="alert-heading" v-else>Deseja apagar compra do histórico?</h6>
        <hr />
        <b-button variant="danger" @click="deletePurchase(id)"
          >Sim</b-button
        >
        <b-button variant="primary" @click="abandonarDeletar()"
          >Cancelar</b-button
        >
      </b-alert>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DetalharCompra",
  data() {
    return {
      id: this.$route.params.id,
      purchase: this.$route.params.purchase,
      status: purchase.status,
      mostrarConfirmacao: false,
    };
  },
  methods: {
    ...mapActions(["addPurchase","deletePurchase"]),
    mensagemDeletar() {
      this.mostrarConfirmacao = true;
    },
    abandonarDeletar() {
      this.mostrarConfirmacao = false;
      this.$route.push({name: 'listaCompras'})
    },
    finalizarCompra(){        
        this.purchase.status = 2
        this.addPurchase(JSON.stringify(this.usuario));
        this.$route.push({name: 'listarCompras'})
    },
    editarCompra(){
        this.$route.push({name: 'editarCompra', params: { id: this.id, purchase : this.purchase }})
    }
  }
};
</script>

<style>
.confirmacaoExclusao {
  margin-top: 4rem;
}
</style>