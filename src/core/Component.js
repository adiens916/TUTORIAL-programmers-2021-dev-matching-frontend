export default class Component {
  $target;
  $props;
  $state;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  setEvent() {
    // event를 각각의 하위 요소가 아니라 component의 target 자체에 등록하는 것이다.
    // 따라서 component가 생성되는 시점에만 이벤트 등록을 해놓으면 추가로 등록할 필요가 없어진다.
  }

  addEvent() {}

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  template() {
    return ``;
  }

  mounted() {}
}
