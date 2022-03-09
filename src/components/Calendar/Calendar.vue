<template>
  <div class="calendar">
    <div class="calendar__nav">
      <button class="calendar__btn" @click="goToPrevMonth">
        <span class="material-icons"> chevron_left </span>
      </button>
      <span class="calendar__month-name">{{ currentMonthName }}</span>
      <span v-if="today.year() !== dateContext.year()"
        >&nbsp{{ dateContext.year() }}</span
      >
      <button class="calendar__btn" @click="goToNextMonth">
        <span class="material-icons"> navigate_next </span>
      </button>
    </div>
    <div class="calendar__body">
      <div class="calendar__day-name" v-for="dayName in days">
        {{ dayName }}
      </div>
      <CalendarDay
        v-for="date in prevMonthDays"
        :date-context="dateContext"
        :day="date"
        :is-current-month="false"
      />
      <CalendarDay
        v-for="date in daysInMonth"
        :date-context="dateContext"
        :day="date"
        :activities="getActivities(date)"
      />
      <CalendarDay
        v-for="date in nextMonthDays"
        :date-context="dateContext"
        :day="date"
        :is-current-month="false"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CalendarDay from "./CalendarDay/CalendarDay";

export default {
  name: "Calendar",
  components: { CalendarDay },
  props: {
    activities: {
      type: Array,
      required: true
    }
  },
  data: () => {
    const dateContext = moment();
    const days = [
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
      "воскресенье",
    ];
    return {
      dateContext,
      today: moment(),
      days,
    };
  },
  methods: {
    goToNextMonth() {
      this.dateContext = moment(this.dateContext.add(1, "month"));
    },
    goToPrevMonth() {
      this.dateContext = moment(this.dateContext.subtract(1, "month"));
    },
    getActivities(date) {
      return this.activitiesMap.get(
        moment(this.dateContext).date(date).format("DD.MM.YY")
      );
    },
  },
  computed: {
    activitiesMap() {
      const activitiesMap = new Map();
      this.activities.forEach((item) => {
        const key = moment(item.date, "DD MM YYYY").format("DD.MM.YY");
        if (activitiesMap.has(key)) {
          activitiesMap.get(key).push(item);
        } else {
          activitiesMap.set(key, [item]);
        }
      });
      return activitiesMap
    },
    currentMonthName() {
      return this.dateContext.format("MMMM");
    },
    prevMonthDays() {
      const result = [];
      const firstDayCurrentMonth = moment(this.dateContext).startOf("month");
      for (let i = this.offset; i > 0; i--) {
        result.push(
          moment(firstDayCurrentMonth).subtract(i, "days").get("date")
        );
      }
      return result;
    },
    nextMonthDays() {
      const result = [];
      const lastDayCurrentMonth = moment(this.dateContext).endOf("month");
      const offset = 7 - (lastDayCurrentMonth.weekday() + 1);
      for (let i = 1; i <= offset; i++) {
        result.push(moment(lastDayCurrentMonth).add(i, "days").get("date"));
      }
      return result;
    },
    daysInMonth() {
      return this.dateContext.daysInMonth();
    },
    currentDate() {
      return this.dateContext.get("date");
    },
    offset() {
      const offset = moment(this.dateContext).subtract(
        this.currentDate - 1,
        "days"
      );
      return offset.weekday();
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  width: 800px;
  height: 800px;
  background-color: white;
  border-radius: 20px;
  padding: 18px;
  &__body {
    width: 100%;
    display: grid;
    padding: 2px;
    border-radius: 4px;
    gap: 2px;
    background-color: #eeeeee;
    grid-template-columns: repeat(7, minmax(50px, 1fr));
    grid-template-rows: 20px repeat(auto-fill, 100px);
  }
  &__day-name {
    text-transform: uppercase;
    font-weight: bold;
    padding: 4px;
    font-size: 8px;
    text-align: right;
  }
  &__month-name {
    font-weight: bold;
    line-height: 1;
  }
  &__btn {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
  }

  &__nav {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
}
</style>
