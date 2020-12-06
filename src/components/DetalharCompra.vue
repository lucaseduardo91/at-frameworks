<template>
  <b-container id="containerDetalhe">
    <h5>{{ purchase.data }}</h5>
    <p v-if="status == 3">Situação: Compra finalizada</p>
    <p v-else>Situação: Aguardando confirmação</p>
    <p v-if="purchase.entrega">Endereço: {{ purchase.endereco }}</p>
    <p>Produtos:</p>

    <b-list-group>
      <b-list-group-item :key="item.id"
        v-for="item in purchase.itens"
        class="d-flex justify-content-between align-items-center"
      >
        {{ item.nome }}
        <b-badge variant="primary" pill>{{ item.quantidade }}</b-badge>
      </b-list-group-item>
    </b-list-group>

    <p class="espacoDetalhe">Valor da compra: R${{ purchase.valor }},00</p>

    <div class="espacoDetalhe">
      <b-button class="tamanhoBotao" variant="primary" v-show="status == 2" @click="editarCompra()">Editar</b-button>
      <b-button class="espacoBotao tamanhoBotao" variant="danger" @click="mensagemDeletar()">Excluir</b-button>
      <b-button class="espacoBotao tamanhoBotao" variant="success" v-show="status == 1" @click="finalizarCompra()">Confirmar</b-button>
    </div>    

    <div class="confirmacaoExclusao" v-show="mostrarConfirmacao">
      <b-alert show variant="danger">
        <h6 class="alert-heading" v-if="status == 1 || status == 2">
          Deseja cancelar a compra?
        </h6>
        <h6 class="alert-heading" v-else>Deseja apagar compra do histórico?</h6>
        <hr />
        <b-button class="tamanhoBotao" variant="danger" @click="deletar()"
          >Sim</b-button
        >
        <b-button class="espacoBotao tamanhoBotao" variant="primary" @click="abandonarDeletar()"
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
      purchase: this.$route.params.compra,
      status: this.$route.params.compra.status,
      mostrarConfirmacao: false,
    }
  },
  methods: {
    ...mapActions(["addPurchase","deletePurchase"]),
    mensagemDeletar() {
      this.mostrarConfirmacao = true;
    },
    abandonarDeletar() {
      this.mostrarConfirmacao = false;
      this.$router.push({name: 'listaCompras'})
    },
    finalizarCompra(){        
        this.purchase.status = 2
        this.addPurchase(this.purchase);
        this.$router.push({name: 'listaCompras'})
    },
    editarCompra(){
        this.$router.push({name: 'editarCompra', params: { id: this.id, purchase : this.purchase }})
    },
    deletar(){
      this.deletePurchase(this.id);
      this.$router.push({name: 'listaCompras'})
    }
  }
};
</script>

<style>
.confirmacaoExclusao {
  margin-top: 4rem;
}
#containerDetalhe{
  margin-top: 3rem;
}
.espacoDetalhe{
  margin-top: 2rem;  
}
.espacoBotao{
  margin-left: 30px;
}
.tamanhoBotao{
  width: 6rem;
}
</style>