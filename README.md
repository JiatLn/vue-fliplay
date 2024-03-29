# vue-fliplay 

<a href="https://www.npmjs.com/package/vue-fliplay"><img src="https://img.shields.io/npm/v/vue-fliplay?color=3fb883&amp;label=" alt="NPM version"></a>


> Inspired by [react-flip-demo](https://github.com/MinJieLiu/react-flip-demo)

Flip is means **F**irst, **L**ast, **I**nvert, **P**lay.
This is a Vue 3 component, to make your list with animation if the data change.


<p align="center">
  <img
    src="./graphs/example.gif"
    alt="vue-fliplay GIF"
    title="A GIF shows vue-fliplay example."
  />
</p>


## Install

```bash
npm i vue-fliplay
```

## Usage

Import the component `FlipWarpper` and `FlipItem` from `vue-fliplay`.

```js
import { FlipItem, FlipWarpper } from 'vue-fliplay'
```

```html
<FlipWarpper :flip-key="{ list }">
  <!-- ...other element... -->
  <!-- flip-item -->
  <FlipItem v-for="item in list" :key="item">
    <div>{{ item }}</div>
  </FlipItem>
  <!-- ...other element... -->
</FlipWarpper>
```

Checkout the [Playground](https://vue-flip.netlify.app) for more examples.

## Props

### FlipWarpper

| Name | Description | Type | Required
|:---- |:----------- |:---- |:-------
| flip-key | `flip-key` is a object. The component will create a deep watcher. When the properties of `flip-key` change, the flip-item will play the animation. | `Object` | `true`

### FlipItem

None

## License

[MIT](./LICENSE) License © 2022-Present [JiatLn](https://github.com/JiatLn)
