/** 行为控制接口 */
export interface IControl {
  /** 行为处理成功 */
  success(blackboard?: any): void;

  /** 行为处理失败 */
  fail(blackboard?: any): void;

  /** 处理行为逻辑 */
  run(blackboard?: any): void;

  /** 正在处理中 */
  running(blackboard?: any): void;
}
