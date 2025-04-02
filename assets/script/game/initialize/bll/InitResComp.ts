import { ModuleUtil } from "../../../module/common/ModuleUtil";
import { AsyncQueue, NextFunction } from "../../../libs/collection/AsyncQueue";
import { ecs } from "../../../libs/ecs/ECS";
import { Initialize } from "../Initialize";
import { UIID } from "../../common/config/GameUIConfig";
import { LoadingViewComp } from "../view/LoadingViewComp";

/** 业务输入参数 */
@ecs.register('InitRes')
export class InitResComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    reset() {
        
    }
}

/** 业务逻辑处理对象 */
@ecs.register('Initialize')
export class InitResSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(InitResComp);
    }

    entityEnter(e: Initialize): void {
        // 注：自定义业务逻辑
        let queue = new AsyncQueue();

        this.loadCustom(queue);
        this.loadLanguage(queue);
        this.loadCommon(queue);
        this.onComplete(queue, e);

        queue.play();
    }

    /** 加载自定义内容 */
    private loadCustom(queue: AsyncQueue): void{
        queue.push(async (next: NextFunction, params: any, args: any) => {
            // 加载多语言对应字体
            ikun.res.load("language/font/" + ikun.i18n.current, next);
        })
    }

    /** 加载语言包 */
    private loadLanguage(queue: AsyncQueue): void{
        queue.push(async (next: NextFunction, params: any, args: any) => {
            // 加载多语言包资源
            ikun.i18n.setLanguage(ikun.i18n.current, next);
        })
    }

    /** 加载公共资源（必备） */
    private loadCommon(queue: AsyncQueue): void{
        queue.push(async (next: NextFunction, params: any, args: any) => {
            ikun.res.loadDir("common", next);
        })
    }

    /** 加载完成进入游戏内容加载界面 */
    private onComplete(queue: AsyncQueue, e: Initialize): void{
        queue.complete = async () => {
            ModuleUtil.addViewUi(e, LoadingViewComp, UIID.Loading);
            e.remove(InitResComp);
        }
    }
}