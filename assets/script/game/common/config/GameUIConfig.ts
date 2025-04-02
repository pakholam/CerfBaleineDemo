import { LayerType } from "../../../core/gui/layer/LayerManager";
/** 界面唯一标识（方便服务器通过编号数据触发界面打开） */
export enum UIID {
  /** 资源加载界面 */
  Loading = 1,
  /** 提示弹出窗口 */
  Alert,
  /** 确认弹出窗口 */
  Confirm,
  /** HOME */
  Home,
  /** 角色信息 */
  Home_Role_Info,
}

/** 打开界面方式的配置数据 */
export var UIConfigData: { [key: number]: UIConfig } = {
  [UIID.Loading]: { layer: LayerType.UI, prefab: "gui/loading/Loading" },
  [UIID.Alert]: { layer: LayerType.Dialog, prefab: "common/prefab/alert", mask: true },
  [UIID.Confirm]: { layer: LayerType.Dialog, prefab: "common/prefab/confirm", mask: true },
  [UIID.Home]: { layer: LayerType.UI, prefab: "gui/prefab/home" },
  [UIID.Home_Role_Info]: { layer: LayerType.UI, prefab: "gui/prefab/role_info" },
};
