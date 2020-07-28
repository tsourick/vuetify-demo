import Utils from '@/utils';

export default  {
  install: function(Vue, name = "$utils") {
      Object.defineProperty(Vue.prototype, name, { value: Utils });
  }
}

