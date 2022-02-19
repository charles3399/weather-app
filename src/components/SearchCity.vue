<template>
  <div class="p-4 mt-1 text-center">
      <input :value="city" type="text" placeholder="Search a city" class="p-4 rounded-full w-3/6 shadow-xl">
  </div>
</template>

<script>
export default {
  name: 'SearchCity',
  props: ['city']
}
</script>

<style scoped>
</style>
