import { _decorator, sys } from "cc";
import { ecs } from "../../../../script/libs/ecs/ECS";
import { CCVMParentComp } from "../../../../script/module/common/CCVMParentComp";
import { smc } from "../../common/ecs/SingletonModuleComp";
import { GameEvent } from "../../common/config/GameEvent";

const { ccclass, property } = _decorator;

/** 游戏资源加载 */
@ccclass('LoadingViewComp')
@ecs.register('LoadingView', false)
export class LoadingViewComp extends CCVMParentComp {
    /** VM 组件绑定数据 */
    data: any = {
        /** 加载资源当前进度 */
        finished: 0,
        /** 加载资源最大进度 */
        total: 0,
        /** 加载资源进度比例值 */
        progress: "0",
        /** 加载流程中提示文本 */
        prompt: ""
    };

    private progress: number = 0;

    /** 视图层逻辑代码分离演示 */
    start() {
        this.enter();
    }

    enter(): void {
        this.addEvent();
        this.loadRes();
    }

    private addEvent(): void{
        this.on(GameEvent.LoginSuccess, this.onHandler, this);
    }

    private onHandler(event: string, args: any): void{
        switch (event){
            case GameEvent.LoginSuccess:
                //加载流程结束，移除加载提示界面
                this.ent.remove(LoadingViewComp);
                break;
        }
    }

    /** 加载资源 */
    private async loadRes(): Promise<void>{
        this.data.progress = 0;
        await this.loadCustom();
        this.loadGameRes();
    }

    /** 加载游戏本地JSON数据（自定义内容） */
    private loadCustom(): void{
        // 加载游戏本地JSON数据的多语言提示文本
        this.data.prompt = ikun.i18n.getLangByID("loading_load_json");
    }

    /** 加载初始游戏内容资源 */
    private loadGameRes(): void{
        // 加载初始游戏内容资源的多语言提示文本
        this.data.prompt = ikun.i18n.getLangByID("loading_load_game");
        ikun.res.loadDir("game", this.onProgressCallback.bind(this), this.onCompleteCallback.bind(this));
    }

    /** 加载进度时间 */
    private onProgressCallback(finished: number, total: number, item: any): void{
        this.data.finished = finished;
        this.data.total = total;

        let progress = finished / total;
        if(progress > this.progress){
            this.progress = progress;
            this.data.progress = (progress * 100).toFixed(2);
        }
    }

    /** 加载完成事件 */
    private onCompleteCallback(): void{
        // 获取用户信息的多语言提示文本
        this.data.prompt = ikun.i18n.getLangByID("loading_load_player");
        // 初始化账号模块
        // smc.account.connect();
    }

    /** 视图对象通过 ecs.Entity.remove(LoadingViewComp) 删除组件是触发组件处理自定义释放逻辑 */
    reset() {
        this.node.destroy();
    }
}