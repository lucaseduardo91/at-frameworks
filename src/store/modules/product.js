import axios from "axios";

const state = {
    products: []
};

const getters = {
    allProducts: state => state.products
};

const actions = {
    getProducts({ commit }) {
        axios.get(
            "http://localhost:3000/products"
        ).then((response) => {
            commit('getProducts', response.data);
        });

    }
}

const mutations = {
    getProducts: (state, data) => (state.products = data)
}

export default {
    state,
    actions,
    getters,
    mutations
};