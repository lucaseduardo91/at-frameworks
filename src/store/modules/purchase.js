import axios from "axios";

const state = {
    purchases: []
  };
  
  const getters = {
      allPurchases: state => state.purchases,
  };
  
  const actions = {
    getPurchases({ commit }) {
      axios.get(
          "http://localhost:3000/purchases"
        ).then((response) => {
          commit('getPurchases', response.data);
      });
  
  },
  
  addPurchase({ commit }, purchase){
    //axios.post...then()
    commit('addPurchase', purchase);
  },
  deletePurchase({ commit }, id){
    //axios.delete...then()
    commit('deletePurchase', id);
  },
  updatePurchase({ commit }, updPurchase) {
    //axios.put...then()    
    commit("updatePurchase", updPurchase);
  },
  
  }
  
  const mutations = {
    getPurchases: (state, data) => (state.purchases = data),
    addPurchase: (state, data) => state.purchases.push(data),
    deletePurchase: (state, id) => (state.purchases = state.purchases.filter(p => p.id !== id)),
    updatePurchase: (state, data) => {
      const index = state.purchases.findIndex(p => p.id === data.id)
      if (index !== -1) {        
        state.purchases.splice(index, 1, data);
        }
      }
  }
  
  export default {
      state,
      actions,
      getters,
      mutations
    };