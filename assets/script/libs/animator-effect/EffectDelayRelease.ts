import { Component, _decorator } from "cc";
import { EffectSingleCase } from "./EffectSingleCase";
const { ccclass, property } = _decorator;

/** 延时释放特效 */
@ccclass("EffectDelayRelease")
export class EffectDelayRelease extends Component {
  /** 延时释放时间(单位秒) */
  @property
  public delay: number = 1;

  protected onEnable() {
    this.scheduleOnce(this.onDelay, this.delay);
  }

  private onDelay() {
    EffectSingleCase.instance.put(this.node);
  }
}
