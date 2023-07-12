<script setup>
import { onBeforeMount , onMounted , reactive , computed , watch} from 'vue';

onBeforeMount(() => {
  console.hLog(`xnm-index-view::onBeforeMount.`);

});
</script>

<template>
  <div class="xnm-theme">
    <RouterView />
  </div>
</template>

<style>
.xnm-theme{
    width: 100%;
}

</style>
