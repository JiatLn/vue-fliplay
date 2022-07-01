<script setup lang="tsx">
const router = useRouter()
const backHome = () => router.push({ name: 'Home' })

const testTsx = (props: { title: string }) => {
  return (
    <div className="flex-c flex-col h-full">
      <div className="text-[24px]">{props.title}</div>
      <p className="text-[#666] mb-8px">this comp is tsx</p>
      <div className="btn w-200px" onClick={backHome}>
        back home
      </div>
    </div>
  )
}
</script>

<template>
  <testTsx title="Login Page" />
</template>

<style lang="scss" scoped>
</style>
