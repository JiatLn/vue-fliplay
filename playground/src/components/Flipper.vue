<script setup lang="ts">
const props = withDefaults(defineProps<{
  watcher: Record<string, any>
  deepWatch?: boolean
}>(), {
  deepWatch: true,
})

const warpperEl = ref<HTMLDivElement | null>()

const lastRectRef = ref<Map<HTMLElement, DOMRect>>(new Map())
const currRectRef = ref<Map<HTMLElement, DOMRect>>(new Map())

watch(() => props.watcher, () => {
  lastRectRef.value = createChildElementRectMap(warpperEl.value)
  nextTick(play)
}, { deep: props.deepWatch })

function createChildElementRectMap(nodes: HTMLElement | null | undefined) {
  if (!nodes)
    return new Map<HTMLElement, DOMRect>()
  let elements: HTMLElement[] = Array.from(nodes.childNodes) as HTMLElement[]
  elements = elements.filter(item => item.nodeType !== 3) // 3 is #text
  const iter: Array<[HTMLElement, DOMRect]>
    = elements.map(node => [node, node.getBoundingClientRect()])
  return new Map<HTMLElement, DOMRect>(iter)
}

function play() {
  currRectRef.value = createChildElementRectMap(warpperEl.value)
  lastRectRef.value.forEach((prevRect, node) => {
    const currRect = currRectRef.value.get(node)
    if (!currRect)
      return
    // Invert
    const invert = {
      left: prevRect.left - currRect.left,
      top: prevRect.top - currRect.top,
    }

    if (invert.top === 0 && invert.left === 0)
      return

    const keyframes = [
      {
        transform: `translate(${invert.left}px, ${invert.top}px)`,
      },
      {
        transform: 'translate(0, 0)',
      },
    ]

    const isLastRectOverflow
      = prevRect.right < 0
      || prevRect.left > innerWidth
      || prevRect.bottom < 0
      || prevRect.top > innerHeight

    const isCurrentRectOverflow
      = currRect.right < 0
      || currRect.left > innerWidth
      || currRect.bottom < 0
      || currRect.top > innerHeight

    if (isLastRectOverflow && isCurrentRectOverflow)
      return

    // Play
    node.animate(keyframes, {
      duration: 800,
      easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    })
  })
}
</script>

<template>
  <div ref="warpperEl">
    <slot />
  </div>
</template>

