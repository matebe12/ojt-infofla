  
let MODAL_MIXIN = {
    data() {
      return {
        show: false,
        subShow: false,
      };
    },
    methods: {
      showModal() {
        this.show = true;
      },
      showSubModal() {
        this.subShow = true;
      },
    },
  };
  
  export default MODAL_MIXIN;