import { ecs } from "../../../script/libs/ecs/ECS";
import { InitResComp } from "./bll/InitResComp";

/** 
 *  游戏进入初始化模块
 *  1. 热更新
 *  2. 加载默认资源
 *  */
@ecs.register('Initialize')
export class Initialize extends ecs.Entity {
    protected init() {
        // 初始化游戏公共资源
        this.add(InitResComp);
    }
}