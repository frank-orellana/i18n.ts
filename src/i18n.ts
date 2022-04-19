import { matchLang } from "./tools.js";

export class Language<M> {
  messages: M;
  fallbackLang: Language<M> | null | undefined;

  constructor(messages: M, fallbackLang?: Language<M> | null) {
    this.fallbackLang = fallbackLang;
    this.messages = messages;
  }

  applyPartial(partialMsgs: Partial<M>) {
    const baseLang = this.fallbackLang
      ? this.fallbackLang.applyPartial(this.messages)
      : {};
    const newMsgs: M = Object.assign<any, M>(baseLang, this.messages);
    Object.assign(newMsgs, partialMsgs);
    return newMsgs;
  }
}
export interface Messages {
  [x: string]: any;
}

export interface AddOptions {
  fallback: string;
}
export class I18N<M extends Messages> {
  static readonly defaultLangName = "en";
  langs = new Map<string, Language<M>>();

  readonly msg: M;
  _defaultLangName: string = I18N.defaultLangName;
  _currentLang: string = I18N.defaultLangName;
  _realCurrentLang: string = I18N.defaultLangName;

  constructor(defaultMsgs: M, langName: string = I18N.defaultLangName) {
    this.langs.set(langName, new Language(defaultMsgs, null));
    if (langName) this._defaultLangName = langName;
    this.msg = Object.assign({}, defaultMsgs);

    this.selectLang();
  }

  get defaultLangName() {
    return this._defaultLangName;
  }

  get defaultLang() {
    return this.langs.get(this.defaultLangName) as Language<M>;
  }

  get currentLang() {
    return this._currentLang;
  }

  set currentLang(newLang: string) {
    this.selectLang(newLang);
  }

  get realCurrentLang() {
    return this._realCurrentLang;
  }

  selectLang(newLang?: string) {
    let lang: string =
      newLang ??
      (typeof window !== "undefined"
        ? window.navigator.languages[0]
        : this.defaultLangName);
    const matchedLang = matchLang(lang, this.langs, this.defaultLangName);

    this._realCurrentLang = matchedLang;
    const m = this.langs.get(matchedLang);
    if (m) Object.assign<M, Partial<M>>(this.msg, m.messages);

    this._currentLang = lang;
  }

  add(langName: string, messages: M) {
    this.langs.set(langName, new Language<M>(messages, null));
  }

  addPartial(
    langName: string,
    messages: Partial<M>,
    fallbackLangName: string = this.defaultLangName
  ) {
    const fallbackLang = this.langs.get(fallbackLangName);

    if (fallbackLang) {
      const newMsgs = fallbackLang.applyPartial(messages);
      this.langs.set(langName, new Language<M>(newMsgs, fallbackLang));
    }
  }

  getMessage(messageId: keyof M): string | undefined {
    if (!this.msg || !this.defaultLang) return;
    return this.msg[messageId];
  }
}
