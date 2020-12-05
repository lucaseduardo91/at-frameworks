<template>
  <b-container>
    <h4 class="tituloMinhasCompras">Minhas compras</h4>

    <b-card-group deck>
      <b-card
        v-for="purchase in allPurchases"
        :key="purchase.id"
        style="min-width: 16rem; max-width: 18rem"
        border-variant="dark"
        :header="purchase.data"
        header-bg-variant="dark"
        header-text-variant="white"
        align="center"
      >
        <router-link
          tag="p"
          :to="{
            name: 'detalharUsuario',
            params: { id: purchase.id, compra: purchase },
          }"
        >
          <b-card-text>{{ purchase.valor }}</b-card-text>
        </router-link>        
      </b-card>
    </b-card-group>
    
  </b-container>

  <b-button squared variant="primary" @click="irParaCadastro()">Nova Compra <b-icon icon="cart3" size="lg" aria-hidden="true"></b-icon></b-button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'MinhasCompras'
    },    
    computed: mapGetters(["allPurchases"]),
    methods: {
        ...mapActions(["getPurchases"]),        
        irParaCadastro(){
          this.mostrarConfirmacao = false;
          this.$route.push({name: 'novaCompra'}); 
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
  margin-bottom: 3rem;
}
</style>