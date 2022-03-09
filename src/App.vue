<template>
  <div id="app">
    <span v-if="!activities">Loading</span>
    <Calendar v-else :activities="activities" />
  </div>
</template>

<script>
import { Calendar } from "@/components";
import CalendarService from "@/api/CalendarService";

export default {
  name: "App",
  components: { Calendar },
  data: () => {
    const activities = null
    return {
      activities,
    };
  },
  async created() {
    this.activities = await CalendarService.fetchActivities()
  },
};
</script>

<style lang="scss">
@import "./styles/style";
</style>
