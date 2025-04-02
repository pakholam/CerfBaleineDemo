import { sys } from "cc";
import { Logger } from "../../../core/common/log/Logger";
import { LanguageData } from "./LanguageData";
import { LanguagePack } from "./LanguagePack";

/** 多语言管理器 */
export class LanguageManager {
  private _languages: Array<string> = [sys.Language.CHINESE, sys.Language.ENGLISH]; // 支持的语言
  private _languagePack: LanguagePack = new LanguagePack(); // 语言包
  private _defaultLanguage: string = sys.Language.CHINESE; // 默认语言

  /** 支持的多种语言列表 */
  get languages(): string[] {
    return this._languages;
  }
  set languages(languages: Array<string>) {
    this._languages = languages;
  }

  /** 设置的当前语言列表中没有配置时，使用默认语言 */
  set default(lang: string) {
    console.log('手机语言', lang)
    lang = lang.toLowerCase(); //转小写的
    lang = lang.replace("-", "_");
    switch (lang) {
      //英语
      case "en_au":
      case "en_bz":
      case "en_ca":
      case "en_gb":
      case "en_ie":
      case "en_jm":
      case "en_nz":
      case "en_tt":
      case "en_us":
      case "en_za":
      case "en_zw":
      case "en":
        this._defaultLanguage = sys.Language.ENGLISH;
        break;
      //法语
      case "fr_be":
      case "fr_ca":
      case "fr_ch":
      case "fr_lu":
      case "fr_mc":
      case "fr":
        this._defaultLanguage = sys.Language.FRENCH;
        break;
      //中文--繁体
      case "zh_hk":
      case "zh_mo":
      case "zh_sg":
      case "zh_tw":
        this._defaultLanguage = "zhf";
        break;

      //中文--简体
      case "zh_cn":
      case "chn":
      case "zh":
        this._defaultLanguage = sys.Language.CHINESE;
        break;
      //葡萄牙语
      case "pt_br":
      case "pt":
        this._defaultLanguage = sys.Language.PORTUGUESE;
        break;
      //日语
      case "ja":
        this._defaultLanguage = sys.Language.JAPANESE;
        break;
      //泰语
      case "th":
        this._defaultLanguage = "th";
        break;
      //西班牙语
      case "es_ar":
      case "es_bo":
      case "es_cl":
      case "es_co":
      case "es_cr":
      case "es_do":
      case "es_ec":
      case "es_gt":
      case "es_hn":
      case "es_mx":
      case "es_ni":
      case "es_pa":
      case "es_pe":
      case "es_pr":
      case "es_py":
      case "es_sv":
      case "es_us":
      case "es_uy":
      case "es_ve":
      case "es":
        this._defaultLanguage = sys.Language.SPANISH;
        break;
      //印度尼西亚语
      case "id":
      case "in": //非ISO 639-2标准
        this._defaultLanguage = "id";
        break;
      //越南语
      case "vi":
        this._defaultLanguage = "vi";
        break;
      //韩国
      case "ko":
        this._defaultLanguage = sys.Language.KOREAN;
        break;
      //德语
      case "de_at":
      case "de_ch":
      case "de_li":
      case "de_lu":
      case "de":
        this._defaultLanguage = sys.Language.GERMAN;
        break;
      //意大利
      case "it":
        this._defaultLanguage = sys.Language.ITALIAN;
        break;
      //马来西亚
      case "ms":
        this._defaultLanguage = "en";
        break;
      //菲律宾
      case "ph":
      case "fil":
      case "en_ph":
        this._defaultLanguage = "en";
        break;
      //土耳其
      case "tr":
        this._defaultLanguage = sys.Language.TURKISH;
        break;
      //印地
      case "hi":
        this._defaultLanguage = sys.Language.HINDI;
        break;
      //俄罗斯
      case "ru":
      case "ru_md":
        this._defaultLanguage = sys.Language.RUSSIAN;
        break;
      //阿拉伯
      case "ar":
      case "ar_ae":
      case "ar_bh":
      case "ar_dz":
      case "ar_eg":
      case "ar_iq":
      case "ar_jo":
      case "ar_kw":
      case "ar_lb":
      case "ar_ly":
      case "ar_ma":
      case "ar_om":
      case "ar_qa":
      case "ar_sa":
      case "ar_sy":
      case "ar_tn":
      case "ar_ye":
        this._defaultLanguage = sys.Language.ARABIC;
        break;
      default:
        this._defaultLanguage = sys.Language.ENGLISH;
    }
  }

  /** 获取当前语种 */
  get current(): string {
    return LanguageData.current;
  }

  /** 语言包 */
  get pack(): LanguagePack {
    return this._languagePack;
  }

  /**
   * 是否存在指定语言
   * @param lang  语言名
   * @returns 存在返回true,则否false
   */
  isExist(lang: string): boolean {
    return this.languages.indexOf(lang) > -1;
  }

  /** 获取下一个语种 */
  getNextLang(): string {
    let supportLangs = this.languages;
    let index = supportLangs.indexOf(LanguageData.current);
    return supportLangs[(index + 1) % supportLangs.length];
  }

  /**
   * 改变语种，会自动下载对应的语种
   * @param language 语言名
   * @param callback 多语言资源数据加载完成回调
   */
  setLanguage(language: string, callback?: (success: boolean) => void) {
    if (language == null || language == "") {
      language = this._defaultLanguage;
    } else {
      language = language.toLowerCase();
    }

    let index = this.languages.indexOf(language);
    if (index < 0) {
      console.log(`当前不支持【${language}】语言，将自动切换到【${this._defaultLanguage}】语言`);
      language = this._defaultLanguage;
    }

    if (language === LanguageData.current) {
      callback && callback(false);
      return;
    }

    this.loadLanguageAssets(language, (lang: string) => {
      Logger.instance.logConfig(`当前语言为【${language}】`);
      const oldLanguage = LanguageData.current;
      LanguageData.current = language;
      this._languagePack.updateLanguage(language);
      this._languagePack.releaseLanguageAssets(oldLanguage);
      callback && callback(true);
    });
  }

  /**
   * 根据data获取对应语种的字符
   * @param labId
   * @param arr
   */
  getLangByID(labId: string): string {
    return LanguageData.getLangByID(labId);
  }

  /**
   * 下载语言包素材资源
   * 包括语言json配置和语言纹理包
   * @param lang
   * @param callback
   */
  loadLanguageAssets(lang: string, callback: Function) {
    lang = lang.toLowerCase();
    return this._languagePack.loadLanguageAssets(lang, callback);
  }

  /**
   * 释放不需要的语言包资源
   * @param lang
   */
  releaseLanguageAssets(lang: string) {
    lang = lang.toLowerCase();
    this._languagePack.releaseLanguageAssets(lang);
  }
}
