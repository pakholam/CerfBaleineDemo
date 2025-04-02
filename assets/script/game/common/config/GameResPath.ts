/** 游戏资源路径 */
export class GameResPath {
    /** 游戏配置路径 */
    static getConfigPath(relative_path: string) {
        return "config/game/" + relative_path;
    }

    /** 角色资源路径 */
    static getRolePath(name: string) {
        return `content/role/${name}`;
    }
}