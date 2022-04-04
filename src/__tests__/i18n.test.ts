import { it, describe, expect } from 'vitest'
import { I18N } from '../i18n'

describe("I18N", () => {
  it("basic translations", () => {
    const en = { test: 'test' }
    const es = { test: 'prueba' }

    const i18n = new I18N(en)
    i18n.add('es', es)

    expect(i18n.msg.test).toBe('test')

    i18n.selectLang('es')

    expect(i18n.currentLang).toBe('es')
    expect(i18n.msg.test).toBe('prueba')

    i18n.currentLang = 'en'
    expect(i18n.currentLang).toBe('en')
    expect(i18n.msg.test).toBe('test')
  })

  it("non default language translations", () => {
    const en = { test: 'test' }
    const es = { test: 'prueba' }

    const i18n = new I18N(es, 'es')
    i18n.add('en', en)

    expect(i18n.msg.test).toBe('prueba')

    i18n.selectLang('en')

    expect(i18n.currentLang).toBe('en')
    expect(i18n.msg.test).toBe('test')
  })

  it("basic translations", () => {
    const en = { test: 'test' }
    const es = { test: 'prueba' }

    const i18n = new I18N(en)
    i18n.add('es', es)

    i18n.selectLang('es')
    expect(i18n.currentLang).toBe('es')
    expect(i18n.msg.test).toBe('prueba')

    i18n.selectLang('en-GB')

    expect(i18n.currentLang).toBe('en-GB')
    expect(i18n.realCurrentLang).toBe('en')
    expect(i18n.msg.test).toBe('test')

  })


  it("works with functions", () => {
    const en = {
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      test(day: number, month: number) {
        return `Today is ${this.monthNames[month]} ${day}th`
      }
    }
    const es = {
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      test(day: number, month: number) {
        return `Hoy es ${day} de ${this.monthNames[month]}`
      }
    }

    const i18n = new I18N(en)
    i18n.add('es', es)
    const t = i18n.msg

    expect(t.test(5, 4)).toBe('Today is May 5th')

    i18n.selectLang('es')
    expect(t.test(5, 4)).toBe('Hoy es 5 de Mayo')
  })

})