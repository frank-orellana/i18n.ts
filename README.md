# Description
Simple minimalist library to use internationalization in any typescript or javascript project, using automatic typescript validation for keys and language files.

# Usage

## Basic usage
```js
const en = {
  simple: 'Some text',
  complex: (num: number) => `There are ${num} things`,
  monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  formattedDate(day: number, month: number) {
    return `Today is ${this.monthNames[month]} ${day}`
  }
}
const es = {
  simple: 'Algún texto',
  complex: (num: number) => `Hay ${num} cosas`,
  monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  formattedDate(day: number, month: number) {
    return `Hoy es ${day} de ${this.monthNames[month]}`
  }
}

const i18n = new I18N(en)
i18n.add('es', es)

const t = i18n.msg

console.log(t.simple) // => 'Some text'
console.log(t.complex(5)) // => 'There are 5 things'
console.log(t.formattedDate(2, 3)) // => 'Today is April 2'

i18n.selectLang('es')
console.log(t.simple) // => 'Algún texto'
console.log(t.complex(5)) // => 'Hay 5 cosas'
console.log(t.formattedDate(2, 3)) // => 'Hoy es 2 de Abril'
```

## Recommendations
### Translation files
Create translation files in a `locales` folder, they can be js or ts files, ts is recommended to take full advantage of validation.
```js
//en.ts or en.js
export const en = {
  testString: "test",
}

//es.ts or es.js
export const es = {
  testString: "prueba",
}
```

## Vue
```js
// In your scripts
import { I18N } from 'simple-i18n-ts'
import { en } from './locales/en'
import { es } from './locales/es'

const i18n = reactive(new I18N(en))
i18n.add('es', es)

const t = props.i18n.msg // Optional, to make templates shorter

// In your templates
{{t.testString}}

// To change language:
i18n.selectLang('es')

```
# Examples
see examples folder