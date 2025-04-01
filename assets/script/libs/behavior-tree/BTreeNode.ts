import { IControl } from "./IControl";

/** 行为树节点 */
export abstract class BTreeNode implements IControl {
  protected _control!: IControl;

  public title: string;

  public constructor() {
    this.title = this.constructor.name;
  }

  public start(blackboard?: any) {}

  public end(blackboard?: any) {}

  public abstract run(blackboard?: any): void;

  public setControl(control: IControl) {
    this._control = control;
  }

  public running(blackboard?: any) {
    this._control.running(this);
  }

  public success() {
    this._control.success();
  }

  public fail() {
    this._control.fail();
  }
}
