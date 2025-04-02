import { _decorator, Component, Node, macro, DynamicAtlasManager, profiler } from 'cc';
import { DEBUG } from 'cc/env';
import { Root } from './core/Root';
import { smc } from './game/common/ecs/SingletonModuleComp';
import { ecs } from './libs/ecs/ECS';
import { Initialize } from './game/initialize/Initialize';
import { Account } from './game/account/Account';
import { UIConfigData } from './game/common/config/GameUIConfig';
const { ccclass, property } = _decorator;

macro.CLEANUP_IMAGE_CACHE = false;
DynamicAtlasManager.instance.enabled = true;
DynamicAtlasManager.instance.maxFrameSize = 512;

@ccclass('Main')
export class Main extends Root {
    start() {
        if (DEBUG) profiler.showStats();
    }

    protected run(): void {
        smc.initialize = ecs.getEntity<Initialize>(Initialize);
        smc.account = ecs.getEntity<Account>(Account);
    }

    protected initGui(): void {
        ikun.gui.init(UIConfigData);
    }

    protected async initEcsSystem(): Promise<void> {
        // ikun.ecs.add(new );
    }
}

