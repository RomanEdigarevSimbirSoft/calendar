<template>
  <div
    class="calendar-day"
    :class="{
      'not-current-month': !isCurrentMonth,
      'is-today': isToday,
    }"
  >
    <div class="calendar-day__day-number">{{ day }}</div>
    <div class="calendar-day__activities">
      <div
        v-for="activity in activities"
        class="calendar-day__activities__item"
      >
        {{ getTime(activity.date) }}
        {{ activity.name }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CalendarDay",
  props: {
    day: {
      type: Number,
      required: true,
    },
    isCurrentMonth: {
      type: Boolean,
      default: true,
    },
    activities: {
      type: Array,
    },
    isToday: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getTime(date) {
      return moment(date).format("HH:mm");
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-day {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  background-color: white;
  border-radius: 4px;
  padding: 4px;
  &__day-number {
    float: right;
  }
  &__activities {
    margin-top: 20px;
    &__item {
      font-size: 10px;
      white-space: nowrap;
      color: darkseagreen;
      background-color: lightgreen;
      padding: 2px;
      border-radius: 2px;
      margin-bottom: 2px;
      overflow: hidden;
      &:hover {
        width: max-content;
        position: relative;
        z-index: 10;
        overflow: initial;
        cursor: pointer;
      }
    }
  }
}
.calendar-day.is-today {
  border: 3px solid lightgray;
  .calendar-day__day-number {
    color: lightgreen;
  }
}
.calendar-day.not-current-month {
  background-color: lightgray;
  .calendar-day__day-number {
    opacity: 0.2;
  }
}
</style>
