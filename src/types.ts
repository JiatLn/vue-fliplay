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
