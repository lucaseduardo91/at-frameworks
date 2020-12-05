import Vue from 'vue';
import VueRouter from 'vue-router';
import MinhasCompras from './components/MinhasCompras'
import DetalharCompra from './components/DetalharCompra'
import NovaCompra from './components/NovaCompra'
import EditarCompra from './components/EditarCompra'

Vue.use(VueRouter);

function guardFavorite(to, from, next) {
    if (to.name == 'editarCompra' && from.name != 'detalharCompra') {
        next('/');
    }
    else {
        next();
    }
}

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'listaCompras',
            component: MinhasCompras
        },
        {
            path: '/compra/:id',
            name: 'detalharCompra',
            component: DetalharCompra
        },
        {
            path: '/nova-compra',
            name: 'novaCompra',
            component: NovaCompra
        },
        {
            path: '/compra/:id/editar',
            name: 'editarCompra',
            component: EditarCompra,
            beforeEnter: guardFavorite
        }
    ]
});