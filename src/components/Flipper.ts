export interface FlipItemType {
  flipId: number
  node: HTMLElement | null | undefined
  rect?: DOMRect
}

export interface IFlipContext {
  add: (item: FlipItemType) => void
  remove: (flipId: number) => void
  nextId: () => number
}

export const FlipWarpper = defineComponent({
  name: 'FlipWarpper',
  props: {
    flipKey: {
      tpye: Object,
      required: true,
    },
  },
  setup(props, ctx) {
    const lastRectRef = ref<Map<number, FlipItemType>>(new Map())
    const uniqueIdRef = ref<number>(0)
    const flipCtx: IFlipContext = {
      add(flipItem: FlipItemType) {
        lastRectRef.value.set(flipItem.flipId, flipItem)
      },
      remove(flipId: number) {
        lastRectRef.value.delete(flipId)
      },
      nextId() {
        uniqueIdRef.value++
        return uniqueIdRef.value
      },
    }

    watch(() => props.flipKey, () => {
      lastRectRef.value.forEach((item: FlipItemType) => {
        item.rect = item.node?.getBoundingClientRect()
      })
      nextTick(flip)
    }, { deep: true })

    function flip() {
      const currentRectMap = new Map<number, DOMRect>()
      lastRectRef.value.forEach((item: FlipItemType) => {
        currentRectMap.set(item.flipId, item.node!.getBoundingClientRect())
      })
      lastRectRef.value.forEach((prevItem: FlipItemType) => {
        const currRect = currentRectMap.get(prevItem.flipId)
        const prevRect = prevItem.rect
        if (!currRect || !prevRect || !prevItem.node)
          return

        // Invert
        const invert = {
          left: prevRect.left - currRect.left,
          top: prevRect.top - currRect.top,
        }

        if (invert.top === 0 && invert.left === 0)
          return

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
        const keyframes: Keyframe[] = [
          {
            transform: `translate(${invert.left}px, ${invert.top}px)`,
          },
          {
            transform: 'translate(0, 0)',
          },
        ]

        prevItem.node.animate(keyframes, {
          duration: 800,
          easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        })
      })
    }

    provide<IFlipContext>('flipCtx', flipCtx)

    return () => {
      const slot = ctx.slots.default?.()
      if (!slot?.length)
        throw new Error('FlipWarpper requires a slot, but not found')
      return h('div', {}, slot)
    }
  },
})

export const FlipItem = defineComponent({
  name: 'FlipItem',
  setup(_, ctx) {
    const currEl = ref<HTMLDivElement | null>()
    const flipCtx = inject<IFlipContext>('flipCtx')!

    // unique Id
    const flipId = flipCtx.nextId()

    onMounted(() => {
      if (currEl.value)
        flipCtx.add({ flipId, node: currEl.value })
    })

    onBeforeUnmount(() => {
      flipCtx.remove(flipId)
    })

    return () => {
      const slot = ctx.slots.default?.()
      if (!slot?.length)
        throw new Error('FlipItem requires a slot, but not found')
      return h('div', { ref: currEl }, slot)
    }
  },
})
