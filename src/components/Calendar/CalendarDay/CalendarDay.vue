<template>
  <div
    class="calendar-day"
    :class="{
      'not-current-month': isBeforeToday,
      'is-today': isToday,
      'is-weekday': isWeekday,
      'is-last-day-on-week': isLastDayOnWeek
    }"
  >
    <div class="calendar-day__day-number">{{ day }}</div>
    <div class="calendar-day__activities">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="calendar-day__activities__item" :class="activity.type"
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
    dateContext: {
      type: Object,
      required: true
    }
  },
  methods: {
    getTime(date) {
      return moment(date).format("HH:mm");
    },
  },
  computed: {
    isToday() {
      return moment(this.dateContext.toDate()).date(this.day).isSame(new Date(), "day");
    },
    isWeekday() {
      return moment(this.dateContext.toDate()).date(this.day).day() === 6 || moment(this.dateContext.toDate()).date(this.day).day() === 0
    },
    isBeforeToday() {
      return moment(moment(this.dateContext.toDate()).date(this.day)).isBefore(new Date(), "day")
    },
    isLastDayOnWeek() {
      return moment(this.dateContext.toDate()).date(this.day).day() === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-day {
  box-sizing: border-box;
  width: 100%;
  min-width: 100px;
  height: 100px;
  background-color: white;
  border: 2px solid lightgray;
  border-radius: 4px;
  padding: 4px;
  &__day-number {
    float: right;
    font-size: 12px;
    font-weight: bold;
  }
  &__activities {
    margin-top: 20px;
    &__item {
      font-size: 10px;
      white-space: nowrap;
      padding: 2px;
      border-radius: 2px;
      margin-bottom: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      //max-height: 100px;
      &:hover {
        padding: 4px;
        max-width: 200px;
        width: max-content;
        position: relative;
        z-index: 10;
        overflow: initial;
        cursor: pointer;
        white-space: normal;
      }
    }
  }
}
.calendar-day.not-current-month {
  opacity: 0.5;
  background-color: lightgray;
  &:hover {
    opacity: 1;
  }
  .calendar-day__day-number {
    opacity: 0.2;
  }
}

.calendar-day.is-weekday {
  color: cornflowerblue;
}

.calendar-day.is-today {
  border: 2px solid #9a9999;
  .calendar-day__day-number {
    color: lightgreen;
  }
}

.calendar-day.is-last-day-on-week {
  .calendar-day__activities__item {
    &:hover {
      transform: translateX(-50%);
    }
  }
}
.red {
  color: darkred;
  background-color: #ff7373;
}

.green {
  color: darkseagreen;
  background-color: lightgreen;
}

.orange {
  color: orangered;
  background-color: orange;
}

</style>
