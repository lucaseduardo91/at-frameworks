<template>
  <div>
    <b-form id="formNovaCompra">

      <b-form-group id="blocoEntrega" label="Escolha a forma de recebimento:" label-for="escolhaEntrega">
        <b-form-select
          id="escolhaEntrega"
          v-model="entrega"
          :options="options"          
        ></b-form-select>
      </b-form-group>

      <b-form-group id="blocoEndereco" label="Endereço da entrega:" label-for="enderecoEntrega" v-show="entrega">
        <b-form-input
           :state="!validacao"
          id="enderecoEntrega"
          v-model="endereco"
          required
          placeholder="Informe o endereço de entrega"
        ></b-form-input>
      </b-form-group>

      <h6>Produtos</h6>
      <b-list-group>
        <b-list-group-item :key="produto.id" v-for="produto in allProducts">
          {{ precoFormatado(produto) }}
          <b-form-spinbutton style="width: 7rem;float:right;" :id="produto.id.toString()" v-model="produto.quantidade" min="0" max="20"></b-form-spinbutton>
          </b-list-group-item>        
      </b-list-group>

      <p>Valor total: R${{ valorTotal }},00</p>

      <b-button variant="primary" @click="registrarCompra()">Ok</b-button>
    </b-form>    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { uuid } from 'vue-uuid'

export default {
 name: 'NovaCompra',
 data() {
    return {      
      options: [
          { value: true, text: 'Entrega em domicílio' },
          { value: false, text: 'Retirada na loja' }
      ],
      entrega: false,
      endereco: '',
      dia: new Date().toLocaleString('pt-Br'),
      id: uuid.v4(),
      status: 1,
      valor: 0
    }
  },
  computed: {
      ...mapGetters(["allProducts"]),
      validacao: function() {
        return this.entrega && this.endereco.length == 0
      },
      valorTotal: function(){
        let total = 0;
        
        let itens = this.allProducts;

        for(let i=0;i < itens.length; i++)
        {
            if(itens[i].quantidade > 0)
            {
              total += (itens[i].quantidade*itens[i].preco);
            }
        }

        if(this.entrega && total < 50)
          total += 10;

        return total;
      }  
  },
  methods: {
    ...mapActions(["getProducts"]),    
    precoFormatado(produto){
      return produto.nome + ' - R$ ' + produto.preco + ',00';
    },
    verificarNaLista(produto){
      return produto.quantidade > 0
    },
    registrarCompra(){
      let itens = this.allProducts.filter(this.verificarNaLista);

      let purchase = {
        "id": this.id,
        "data": this.dia,
        "status": this.status,
        "entrega": this.entrega,
        "endereco": this.endereco,
        "itens": itens,
        "valor": this.valorTotal
      };

      this.$router.push({name: 'detalharCompra', params: { id: purchase.id, compra: purchase }})
    }
  },
  created(){
    this.getProducts();    
  }
}
</script>

<style>
#formNovaCompra{
  margin-top: 3rem;
}
</style>