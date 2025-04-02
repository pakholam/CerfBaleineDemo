import { _decorator, Component, Node } from 'cc';
import { ecs } from '../../..//libs/ecs/ECS';
import { Initialize } from '../../initialize/Initialize';
import { Account } from '../../account/Account';
const { ccclass, property } = _decorator;

/** 游戏模块 */
@ecs.register("SingletonModule")
export class SingletonModuleComp extends ecs.Comp {
    /** 游戏初始化模块 */
    initialize: Initialize = null!;

    /** 游戏账号模块 */
    account: Account = null;
    reset(): void {
        
    }
}

export const smc: SingletonModuleComp = ecs.getSingleton(SingletonModuleComp);
