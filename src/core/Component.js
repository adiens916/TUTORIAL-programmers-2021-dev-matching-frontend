export default class Component {
  $target;
  $props;
  $state;

  /**
   * @param {Element} $target
   * @param {Object} $props
   */
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.initState();
    this.render();
    this.setEvent();
    this.loadData();
  }

  initState() {}

  template() {
    return ``;
  }

  render() {
    this.$target.innerHTML = this.template();
    // render는 현재 컴포넌트만 갱신하기 때문에
    // 하위 컴포넌트들도 불러와서 렌더링해야 함.
    this.mountComponent();
  }

  mountComponent() {}

  getComponentTag(selector) {
    return this.$target.querySelector(`[data-component="${selector}"]`);
  }

  setEvent() {}

  /**
   * @param {string} selector
   * @param {string} eventType
   * @param {EventListener} callback
   */
  addEvent(selector, eventType, callback) {
    /**
     * event listener를 각각의 하위 요소가 아니라
     * component의 target 자체에 등록
     * 따라서 매번 추가로 등록할 필요가 없어짐.
     */

    this.$target.addEventListener(eventType, (event) => {
      // 해당 selector를 찾고, 못 찾으면 null을 반환
      const target = event.target.closest(selector);
      if (target) {
        callback(target);
      }
    });
  }

  loadData() {}

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
