<template>
  <div class="calendar">
    <button @click="goToPrevMonth">prev month</button>
    {{ currentMonthName }}
    <button @click="goToNextMonth">next month</button>
    <div class="calendar__header"></div>
    <div class="calendar__body">
      <div class="calendar__day-name" v-for="dayName in days">
        {{ dayName }}
      </div>
      <CalendarDay
        v-for="date in prevMonthDays"
        :day="date"
        :is-current-month="false"
      />
      <CalendarDay
        v-for="date in daysInMonth"
        :day="date"
        :activities="getActivities(date)"
        :is-today="isToday(date)"
      />
      <CalendarDay
        v-for="date in nextMonthDays"
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
  data: () => {
    const dateContext = moment();
    const activities = [
      {
        id: "1",
        name: "Коммуникационный дизайн среды",
        type: "",
        date: "10.02.2022,09:30",
      },
      {
        id: "1",
        name: "Коммуникационный дизайн среды",
        type: "",
        date: "05.03.2022,09:30",
      },
      {
        id: "1",
        name: "Коммуникационный дизайн среды",
        type: "",
        date: "05.03.2022,10:30",
      },
      {
        id: "1",
        name: "Коммуникационный дизайн среды",
        type: "",
        date: "06.03.2022,09:30",
      },
    ];
    const activitiesMap = new Map();
    activities.forEach((item) => {
      const key = moment(item.date, "DD MM YYYY").format("DD.MM.YY");
      if (activitiesMap.has(key)) {
        activitiesMap.get(key).push(item);
      } else {
        activitiesMap.set(key, [item]);
      }
    });
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
      activitiesMap,
    };
  },
  methods: {
    goToNextMonth() {
      this.dateContext = moment(this.dateContext).add(1, "month");
    },
    goToPrevMonth() {
      this.dateContext = moment(this.dateContext).subtract(1, "month");
    },
    getActivities(date) {
      return this.activitiesMap.get(
        this.dateContext.date(date).format("DD.MM.YY")
      );
    },
    isToday(date) {
      return this.dateContext.date(date).isSame(new Date(), "day");
    },
  },
  computed: {
    currentYear() {
      return this.dateContext.year();
    },
    currentMonthName() {
      return this.dateContext.format("MMMM");
    },
    prevMonth() {
      return this.dateContext.subtract(1, "month");
    },
    prevMonthDays() {
      const result = [];
      const firstDayCurrentMonth = this.dateContext.startOf("month");
      for (let i = this.offset; i > 0; i--) {
        result.push(
          moment(firstDayCurrentMonth).subtract(i, "days").get("date")
        );
      }
      return result;
    },
    nextMonthDays() {
      const result = [];
      const lastDayCurrentMonth = this.dateContext.endOf("month");
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
    height: 100%;
    display: grid;
    padding: 2px;
    gap: 2px;
    background-color: #eeeeee;
    grid-template-columns: repeat(7, minmax(50px, 1fr));
    grid-auto-rows: 100px;
  }
  &__day-name {
    font-size: 12px;
    text-align: right;
  }
}
</style>
