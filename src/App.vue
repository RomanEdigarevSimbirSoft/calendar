<template>
  <div id="app">
    <Calendar :activities="activities" />
  </div>
</template>

<script>
import { Calendar } from "@/components";

export default {
  name: "App",
  components: { Calendar },
  data: () => {
    const activities = [
      {
        id: "1",
        name: "Коммуникационный дизайн среды",
        type: "red",
        date: "05.03.2022,09:30",
      },
      {
        id: "1",
        name: "Коммуникационный дизайн среды",
        type: "orange",
        date: "05.03.2022,09:30",
      },
      {
        id: "1",
        name: "Коммуникационный дизайн среды",
        type: "green",
        date: "06.03.2022,10:30",
      },
      {
        id: "1",
        name: "Коммуникационный дизайн среды",
        type: "orange",
        date: "07.03.2022,09:30",
      },
    ];
    return {
      activities
    }
  }
};
</script>

<style lang="scss">
@import "./styles/style";
</style>
