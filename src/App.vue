<template>
  <div id="app">
    <Calendar />
  </div>
</template>

<script>
import { Calendar } from "@/components";

export default {
  name: "App",
  components: { Calendar },
};
</script>

<style lang="scss">
@import "./styles/style";
</style>
