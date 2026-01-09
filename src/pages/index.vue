<script setup lang="ts">
import LogoImgUrl from '~/assets/vue.svg'
import IconEpMoonNight from '~icons/ep/moon-night'
import IconEpSunny from '~icons/ep/sunny'

import type { SwitchInstance } from 'element-plus'

defineOptions({ inheritAttrs: false })

const darkMode = ref(isDark.value)
const switchRef = ref<SwitchInstance>()
const count = ref(0),
  msg = 'Hello Vite'

watch(
  () => isDark.value,
  (newVal) => {
    darkMode.value = newVal
  }
)

watch(
  () => darkMode.value,
  (newVal) => {
    if (newVal !== isDark.value) {
      toggleDark()
    }
  }
)

const beforeChange = () => {
  return new Promise<boolean>((resolve) => {
    const isAppearanceTransition =
      // @ts-expect-error
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isAppearanceTransition) {
      resolve(true)
      return
    }

    const switchElement = switchRef.value?.$el
    const rect = switchElement.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const ratioX = (100 * x) / innerWidth
    const ratioY = (100 * y) / innerHeight
    const referR = Math.hypot(innerWidth, innerHeight) / Math.SQRT2
    const ratioR = (100 * endRadius) / referR

    const transition = document.startViewTransition(async () => {
      resolve(true)
      await nextTick()
    })
    transition.ready.then(() => {
      const clipPath = [
        `circle(0% at ${ratioX}% ${ratioY}%)`,
        `circle(${ratioR}% at ${ratioX}% ${ratioY}%)`,
      ]

      document.documentElement.animate(
        {
          clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-in',
          fill: 'both',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        }
      )
    })
  })
}
</script>

<template>
  <div style="display: flex; justify-content: flex-end">
    <el-switch
      ref="switchRef"
      v-model="darkMode"
      v-bind="$attrs"
      :before-change="beforeChange"
      :active-action-icon="IconEpMoonNight"
      :inactive-action-icon="IconEpSunny"
      style="margin-right: 4em"
    />
  </div>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img :src="LogoImgUrl" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <h1>{{ msg }}</h1>

  <div class="card">
    <el-button type="primary" @click="count++">count is {{ count }}</el-button>
    <p>
      Edit
      <code>pages/index.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style lang="scss" scoped>
* {
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  transition: filter 0.3s;
  will-change: filter;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}

.read-the-docs {
  color: var(--el-color-info);
}
</style>
