import Vue from 'vue'
import Confirm from './message.vue'
const ConfirmBox = Vue.extend(Confirm);
Confirm.installF = (title, content) => {
    let instance = new ConfirmBox().$mount();
    return instance.confirmF(title, content);
};
export default Confirm