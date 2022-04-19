import { it, describe, expect } from "vitest";
import { I18N } from "../i18n";

describe("I18N", () => {
  it("basic translations", () => {
    const en = { test: "test" };
    const es = { test: "prueba" };

    const i18n = new I18N(en);
    i18n.add("es", es);

    expect(i18n.msg.test).toBe("test");

    i18n.selectLang("es");

    expect(i18n.currentLang).toBe("es");
    expect(i18n.msg.test).toBe("prueba");

    i18n.currentLang = "en";
    expect(i18n.currentLang).toBe("en");
    expect(i18n.msg.test).toBe("test");
  });

  it("non default language translations", () => {
    const en = { test: "test" };
    const es = { test: "prueba" };

    const i18n = new I18N(es, "es");
    i18n.add("en", en);

    expect(i18n.msg.test).toBe("prueba");

    i18n.selectLang("en");

    expect(i18n.currentLang).toBe("en");
    expect(i18n.msg.test).toBe("test");
  });

  it("basic translations", () => {
    const en = { test: "test" };
    const es = { test: "prueba" };

    const i18n = new I18N(en);
    i18n.add("es", es);

    i18n.selectLang("es");
    expect(i18n.currentLang).toBe("es");
    expect(i18n.msg.test).toBe("prueba");

    i18n.selectLang("en-GB");

    expect(i18n.currentLang).toBe("en-GB");
    expect(i18n.realCurrentLang).toBe("en");
    expect(i18n.msg.test).toBe("test");
  });

  it("works with functions", () => {
    const en = {
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      test(day: number, month: number) {
        return `Today is ${this.monthNames[month]} ${day}th`;
      },
    };
    const es = {
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      test(day: number, month: number) {
        return `Hoy es ${day} de ${this.monthNames[month]}`;
      },
    };

    const i18n = new I18N(en);
    i18n.add("es", es);
    const t = i18n.msg;

    expect(t.test(5, 4)).toBe("Today is May 5th");

    i18n.selectLang("es");
    expect(t.test(5, 4)).toBe("Hoy es 5 de Mayo");
  });

  it("Readme sample works", () => {
    const en = {
      simple: "Some text",
      complex: (num: number) => `There are ${num} things`,
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      formattedDate(day: number, month: number) {
        return `Today is ${this.monthNames[month]} ${day}`;
      },
    };
    const es = {
      simple: "Algún texto",
      complex: (num: number) => `Hay ${num} cosas`,
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      formattedDate(day: number, month: number) {
        return `Hoy es ${day} de ${this.monthNames[month]}`;
      },
    };

    const i18n = new I18N(en);
    i18n.add("es", es);

    const t = i18n.msg;

    expect(t.simple).toBe("Some text");
    expect(t.complex(5)).toBe("There are 5 things");
    expect(t.formattedDate(2, 3)).toBe("Today is April 2");

    i18n.selectLang("es");
    expect(t.simple).toBe("Algún texto");
    expect(t.complex(5)).toBe("Hay 5 cosas");
    expect(t.formattedDate(2, 3)).toBe("Hoy es 2 de Abril");
  });
});

describe("I18N fallbacks", () => {
  const en = {
    test: "test_en",
    test2: "test2_en",
    test3: "test3_en",
  };

  const enGB = {
    test2: "test2_en_GB",
  };

  const es = {
    test: "prueba_es",
    test2: "prueba2_es",
    test3: "prueba3_es",
  };

  const es_LA = {
    test2: "prueba2_es_419",
  };

  const es_MX = {
    test3: "prueba3_es_MX",
  };

  it("fallbacks to default", () => {
    const i18n = new I18N(en);

    i18n.addPartial("en-GB", enGB);

    const t = i18n.msg;
    expect(t.test2).toBe("test2_en");

    i18n.selectLang("en-GB");

    expect(t.test).toBe("test_en");
    expect(t.test2).toBe("test2_en_GB");
  });

  it("Multiple fallbacks", () => {
    const i18n = new I18N(en);

    i18n.add("es", es);
    i18n.addPartial("es_419", es_LA, "es");
    i18n.addPartial("es_MX", es_MX, "es_419");

    i18n.selectLang("es_MX");

    const t = i18n.msg;
    expect(t.test3).toBe("prueba3_es_MX");
    expect(t.test2).toBe("prueba2_es_419");
    expect(t.test).toBe("prueba_es");

    expect(i18n.getMessage("test3")).toBe("prueba3_es_MX");
    expect(i18n.getMessage("test2")).toBe("prueba2_es_419");
    expect(i18n.getMessage("test")).toBe("prueba_es");
  });
});
