import { Node } from "cc";

/** 本类型仅供gui模块内部使用，请勿在功能逻辑中使用 */
export class ViewParams {
    /** 界面配置 */
    config: UIConfig = null!;
    /** 传递给打开界面的参数 */
    params: any = null!;
    /** 窗口事件 */
    callbacks: UICallbacks = null!;
    /** 是否在使用状态 */
    valid: boolean = true;
    /** 界面根节点 */
    node: Node = null!;
}