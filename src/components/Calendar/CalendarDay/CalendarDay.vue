<template>
  <div
    class="calendar-day"
    :class="{
      'not-current-month': !isCurrentMonth,
      'is-today': isToday,
      'is-weekday': isWeekday
    }"
  >
    <div class="calendar-day__day-number">{{ day }}</div>
    <div class="calendar-day__activities">
      <div
        v-for="activity in activities"
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
    }
  }
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
.calendar-day.not-current-month {
  background-color: lightgray;
  .calendar-day__day-number {
    opacity: 0.2;
  }
}
.calendar-day.is-weekday {
  color: cornflowerblue;
}
.calendar-day.is-today {
  border: 3px solid lightgray;
  .calendar-day__day-number {
    color: lightgreen;
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
