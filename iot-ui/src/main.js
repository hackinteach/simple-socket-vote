import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import io from 'socket.io-client';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.config.productionTip = false;

const mixin = {
  data: function () {
    return {
      socketio: io('http://localhost:3000/')
    }
  }
};

Vue.mixin(mixin)

new Vue({
  render: h => h(App),
}).$mount('#app')
