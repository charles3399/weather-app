<template>
  <div class="p-4 flex justify-center">
      <figure class="p-2 border-4 border-gray-900 rounded-xl w-96 shadow-2xl bg-white">
        <span class="float-right text-2xl font-bold">&#9881;</span>
          <div class="text-center mb-3">
              <h3 class="text-xl font-bold tracking-wider">Manila, Philippines</h3>
              <p>10:00 AM</p>
          </div>
          <div class="text-center mb-3">
            <h3 class="text-6xl font-bold">32&#176;C</h3>
            <p class="text-2xl">feels sunny</p>
          </div>
          <div class="text-center m-5 flex flex-row justify-center gap-4">
            <span>Highest: 32&#176;C</span>
            <span>Lowest: 25&#176;C</span>
          </div>
          <div class="text-center m-5 flex flex-row justify-center gap-8">
            <div>
                <h4 class="text-2xl font-bold">Sunrise</h4>
                <span>insert icon here</span>
                <p>6:00 AM</p>
            </div>
            <div>
                <h4 class="text-2xl font-bold">Sunset</h4>
                <span>insert icon here</span>
                <p>5:51 PM</p>
            </div>
          </div>
      </figure>
  </div>
</template>

<script>
export default {
  name: 'WeatherCard'
}
</script>

<style scoped>
</style>
