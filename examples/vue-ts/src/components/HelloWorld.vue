<script setup lang="ts">
import { ref } from 'vue'
import { I18N } from 'simple-i18n-ts'
import { en } from '../locales'

const props = defineProps<{ msg: string, i18n: I18N<typeof en> }>()

const count = ref(0)


const t = props.i18n.msg

</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    {{ t.recommendedIDESetup }}:
    <a
      href="https://code.visualstudio.com/"
      target="_blank"
    >{{ t.vscode }}</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p v-html="t.seeReadme('README.md')" />

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">{{ t.counter(count) }}</button>
  <br />
  <button type="button" @click="i18n.selectLang('en')">English</button>
  <button type="button" @click="i18n.selectLang('es')">Espanol</button>
  <p v-html="t.editToTestHMR"></p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
