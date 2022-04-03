# Description
Simple minimalist library to use internationalization in any typescript or javascript project, using automatic typescript validation for keys and language files.

# Usage
## Translation files
```js
//en.ts or en.js
export default {
  testString: "test",
}

//es.ts or es.js
export default {
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