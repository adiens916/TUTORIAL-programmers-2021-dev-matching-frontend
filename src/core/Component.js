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

  setEvent() {}

  addEvent(selector, eventType, callback) {
    /**
     * event listener를 각각의 하위 요소가 아니라
     * component의 target 자체에 등록
     * 따라서 매번 추가로 등록할 필요가 없어짐.
     */

    // const children = this.$target.querySelectorAll(selector);
    // const isTarget = (target) => children.includes(target) || target.closest(selector)

    this.$target.addEventListener(eventType, (event) => {
      // event 대상이 selector인 경우, callback 실행
      if (event.target.closest(selector)) {
        callback(event);
      }
    });
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  template() {
    return ``;
  }

  mounted() {}

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
