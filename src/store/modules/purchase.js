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
    const headers = { 
      "Content-Type": "application/json"
    };

    axios.post(
      "http://localhost:3000/purchases", purchase, {headers}
    ).then((response) => {      
      commit('addPurchase', response.data);
    });
    
  },
  
  deletePurchase({ commit }, id){
    const headers = { 
      "Content-Type": "application/json"
    };

    axios.delete(
      "http://localhost:3000/purchases/"+id, {headers}
    ).then((response) => {      
      commit('deletePurchase', response.data.id);
    });
    
  },

  updatePurchase({ commit }, updPurchase) {  
    const headers = { 
      "Content-Type": "application/json"
    };

    axios.put(
      "http://localhost:3000/purchases/"+updPurchase.id, updPurchase, {headers}
    ).then((response) => {      
      commit("updatePurchase", response.data);
    });
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