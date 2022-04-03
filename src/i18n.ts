/*
Copyright 2019 Franklin Orellana
This file is part of DiffViewer.
DiffViewer is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
DiffViewer is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with DiffViewer.  If not, see <https://www.gnu.org/licenses/>. */

export interface Messages {
	[x: string]: any
}
export class I18N<M extends Messages> {
	static readonly defaultLangName = 'en';
	langs = new Map<string, M>();

	readonly msg: M;
	currentLang: string = I18N.defaultLangName;
	_realCurrentLang: string = I18N.defaultLangName

	constructor(defaultMsgs: M) {
		this.selectLang();
		this.langs.set(I18N.defaultLangName, defaultMsgs)
		this.msg = Object.assign({}, defaultMsgs)	
	}

	get defaultLang() {
		return this.langs.get(I18N.defaultLangName) as M
	}

	get realCurrentLang() {
		return this._realCurrentLang
	}
	set realCurrentLang(newValue: string) {
		this._realCurrentLang = newValue
		const m = this.langs.get(newValue)
		if (m)
			Object.assign(this.msg, m)
	}

	selectLang(plang?: string) {
		if (typeof window === 'undefined') {
			this.currentLang = I18N.defaultLangName
			return
		}
		var lang: string = plang || window.navigator.languages[0];
		console.log(lang);
		if (this.langs.get(lang))
			this.realCurrentLang = lang;
		else if (this.langs.get(lang.substring(0, 2)))
			this.realCurrentLang = lang.substring(0, 2);
		else
			this.realCurrentLang = I18N.defaultLangName;

		this.currentLang = lang;
	}

	add(lang: string, obj: M) {
		const langObj = this.langs.get(lang);
		if (!langObj) {
			this.langs.set(lang, obj);
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
