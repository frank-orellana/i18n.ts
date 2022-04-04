import { describe, expect, it } from "vitest";
import { matchLang } from "../tools";

describe("tools", () => {
  it("matches simple lang", () => {
    const availableLanguages = new Map<string, any>([["en", null], ["es", null]])

    expect(matchLang('en', availableLanguages, "en")).toBe('en')
    expect(matchLang('en-US', availableLanguages, "en")).toBe('en')
    expect(matchLang('en-GB', availableLanguages, "en")).toBe('en')
    
    expect(matchLang('es', availableLanguages, "en")).toBe('es')
    expect(matchLang('es-ES', availableLanguages, "en")).toBe('es')
  })

  it("matches simple lang", () => {
    const availableLanguages = new Map<string, any>([["en", null], ["en-GB", null], ["es", null], ["es-MX", null]])

    expect(matchLang('en', availableLanguages, "en")).toBe('en')
    expect(matchLang('en-US', availableLanguages, "en")).toBe('en')
    expect(matchLang('en-GB', availableLanguages, "en")).toBe('en-GB')
    
    expect(matchLang('es', availableLanguages, "en")).toBe('es')
    expect(matchLang('es-ES', availableLanguages, "en")).toBe('es')
    expect(matchLang('es-MX', availableLanguages, "en")).toBe('es-MX')
    expect(matchLang('es-CL', availableLanguages, "en")).toBe('es')
  })
})