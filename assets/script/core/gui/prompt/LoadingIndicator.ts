import { Component, Node, _decorator } from "cc";

const { ccclass, property } = _decorator;

/** 加载延时提示动画 */
@ccclass("LoadingIndicator")
export class LoadingIndicator extends Component {
  @property(Node)
  private loading: Node | null = null;

  private loading_rotate: number = 0;

  update(dt: number) {
    this.loading_rotate += dt * 220;
    this.loading!.setRotationFromEuler(0, 0, -this.loading_rotate % 360);
    if (this.loading_rotate > 360) {
      this.loading_rotate -= 360;
    }
  }
}
