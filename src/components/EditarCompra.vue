<template>
  <b-container>
    <label for="selectAtualizar">Escolha a forma de recebimento:</label>
    <b-form-select v-model="purchase.entrega" :options="options" id="selectAtualizar" @change="onChange"></b-form-select>
    <label for="enderecoAtualizar" v-show="purchase.entrega == 1">Endereço da entrega:</label>
    <b-form-input v-model="purchase.endereco" id="enderecoAtualizar" v-show="purchase.entrega == 1"></b-form-input>
    <p>Valor da compra: {{ purchase.valor }}</p>
    <b-button variant="primary" @click="atualizarCompra()">Atualizar</b-button>
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
          { value: 1, text: 'Entrega em domicílio' },
          { value: 2, text: 'Retirada na loja' }
      ]
    };
  },
  computed: {

  },
  methods: {
    ...mapActions(["updatePurchase"]),
    atualizarCompra() {
      this.updatePurchase(this.purchase);
    },
    onChange(evt){
      if(event.target.value == 1 && this.purchase.value < 50)
      {
        this.purchase.value += 10;
      }
      else if(event.target.value == 2 && this.purchase.value < 50)
      {
        this.purchase.value -= 10;
      }
    }
  }
}  
</script>

<style>

</style>