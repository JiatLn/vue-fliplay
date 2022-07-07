import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-c', 'flex items-center justify-center'],
    [
      'btn',
      'px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 dark:border-purple-800 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 ring-purple-600 ring-opacity-40 cursor-pointer text-center',
    ],
  ],
  theme: {
    colors: {
      brand: {
        primary: '#f87171', // used like bg-brand-primary
        light: '#80eec0', // used like bg-brand-light
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1,
      warn: true,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
