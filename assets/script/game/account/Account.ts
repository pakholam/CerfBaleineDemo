import { ecs } from "../../../script/libs/ecs/ECS";

/** Account 模块 */
@ecs.register('Account')
export class Account extends ecs.Entity {
    /** ---------- 数据层 ---------- */
    // AccountModel!: AccountModelComp;

    /** ---------- 业务层 ---------- */
    // AccountBll!: AccountBllComp;

    /** ---------- 视图层 ---------- */
    // AccountView!: AccountViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
        // this.addComponents<ecs.Comp>();
    }
}