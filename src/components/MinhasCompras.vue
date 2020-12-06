<template>
<div>  
  <b-container>
    <h4 class="tituloMinhasCompras">Minhas compras</h4>

    <b-card-group deck>
      <b-card class="compra"
        v-for="purchase in allPurchases"
        :key="purchase.id"
        style="min-width: 12rem; max-width: 14rem"
        border-variant="dark"
        :header="purchase.data"
        header-bg-variant="dark"
        header-text-variant="white"
        align="center"
      >
        <router-link
          tag="p"
          :to="{
            name: 'detalharCompra',
            params: { id: purchase.id, compra: purchase }
          }"
        >
          <b-card-text>RS{{ purchase.valor }},00</b-card-text>
        </router-link>        
      </b-card>
    </b-card-group>

    <b-button class="botaoNova" squared variant="primary" @click="irParaCadastro()">Nova Compra <b-icon icon="cart3" size="lg" aria-hidden="true"></b-icon></b-button>
  </b-container>
</div>
  
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'MinhasCompras',
    computed: mapGetters(["allPurchases"]),
    methods: {
        ...mapActions(["getPurchases"]),        
        irParaCadastro(){ 
          this.$router.push({name: 'novaCompra'}); 
        } 
    },
    created(){
        this.getPurchases();
    }
}
</script>

<style>
.confirmacaoExclusao{
  margin-top: 4rem;
}

.tituloMinhasCompras{
  margin-top: 4rem;
  margin-bottom: 1rem;
}
.compra{
  margin-top: 2rem;
}
.botaoNova{
  margin-top: 3rem;
}
</style>