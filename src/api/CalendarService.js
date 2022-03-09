import { activities } from "@/mock";

class CalendarService {
  activities;

  get activities() {
    return this.activities;
  }

  set activities(activities) {
    this.activities = activities;
  }

  async fetchActivities() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(activities);
      }, 1000);
    });
  }
}
export default new CalendarService();
