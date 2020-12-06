<template>
  <b-container id="containerAtualizacao">
    <h4>Editar compra:</h4>
    <label class="espacoCampos" for="selectAtualizar">Escolha a forma de recebimento:</label>
    <b-form-select v-model="purchase.entrega" :options="options" id="selectAtualizar" @change="onChange"></b-form-select>
    <label class="espacoCampos" for="enderecoAtualizar" v-show="purchase.entrega == 1">Endereço da entrega:</label>
    <b-form-input :state="!validacao" v-model="purchase.endereco" id="enderecoAtualizar" v-show="purchase.entrega == 1"></b-form-input>
    <p id="valorAtualiza">{{ valorAtualizado }}</p>
    <b-button id="btnAtualiza" variant="primary" @click="atualizarCompra()">Atualizar</b-button>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
 name: 'EditarCompra',
 data() {
    return {
      id: this.$route.params.id,
      purchase: this.$route.params.purchase,
      options: [
          { value: true, text: 'Entrega em domicílio' },
          { value: false, text: 'Retirada na loja' }
      ]
    };
  },
  computed: {
    valorAtualizado: function(){
      return "Valor da compra: R$ "+ this.purchase.valor +",00"
    },
      validacao: function() {
        return this.purchase.entrega && this.purchase.endereco.length == 0
      }
  },
  methods: {
    ...mapActions(["updatePurchase"]),
    atualizarCompra() {
      if(this.purchase.entrega == false)
      {
        this.purchase.endereco = ''
      }

      this.updatePurchase(this.purchase);
      this.$router.push({name: 'listaCompras'})
    },
    onChange(){      
      if(this.purchase.entrega == true && this.purchase.valor < 50)
      {
        this.purchase.valor += 10;
      }
      else if(this.purchase.entrega == false && this.purchase.valor < 50)
      {
        this.purchase.valor -= 10;        
      }
    }
  }
}  
</script>

<style>
#containerAtualizacao{
  margin-top: 4rem;
}
#btnAtualiza{
  margin-top: 1.5rem;
  width: 8rem;
}
#valorAtualiza{
  margin-top: 1.5rem;
  font-weight: bold;
}
.espacoCampos{
  margin-top: 1rem;
}
</style>