import { matchLang } from "./tools";

export interface Messages {
	[x: string]: any
}
export class I18N<M extends Messages> {
	static readonly defaultLangName = 'en';
	langs = new Map<string, M>();

	readonly msg: M;
	_currentLang: string = I18N.defaultLangName;
	_realCurrentLang: string = I18N.defaultLangName

	constructor(defaultMsgs: M, langName: string = I18N.defaultLangName) {
		this.selectLang();
		this.langs.set(langName, defaultMsgs)
		this.msg = Object.assign({}, defaultMsgs)
	}

	get defaultLang() {
		return this.langs.get(I18N.defaultLangName) as M
	}

	get currentLang() {
		return this._currentLang
	}

	set currentLang(newLang: string) {
		this.selectLang(newLang)
	}

	get realCurrentLang() {
		return this._realCurrentLang
	}

	selectLang(newLang?: string) {
		let lang: string = newLang ?? (typeof window !== 'undefined' ? window.navigator.languages[0] : I18N.defaultLangName)
		const matchedLang = matchLang(lang, this.langs, I18N.defaultLangName)

		this._realCurrentLang = matchedLang
		const m = this.langs.get(matchedLang)
		if (m) Object.assign(this.msg, m)

		this._currentLang = lang;
	}

	add(langName: string, obj: M) {
		const langObj = this.langs.get(langName);
		if (!langObj) {
			this.langs.set(langName, obj);
		} else {
			Object.assign(langObj, obj)
		}
	}

	addPartial(lang: string, obj: Partial<M>, fallbackLang?: string) {
		const langObj = (fallbackLang ? this.langs.get(fallbackLang) : null) ?? this.langs.get(lang);
		if (!langObj) {
			this.langs.set(lang, Object.assign(this.defaultLang, obj));
		} else {
			Object.assign(langObj, obj)
		}
	}

	getMessage(messageId: keyof M): string | undefined {
		if (!this.msg) return;
		let res = this.msg[messageId];

		if (!res) {
			let errMsg: string = `I18N: message "${messageId}" not found in language ${this.currentLang}`;
			if (this.currentLang != I18N.defaultLangName) {
				res = this.defaultLang[messageId];
				errMsg += res ? `, using default lang` : ` nor in default lang`;
				console.warn(errMsg);
			}
		}

		return res;
	}
}
