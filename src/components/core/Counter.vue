<template>
  <div class="counter">
    <h1>{{displayDays}}:{{displayHours}}:{{displayMinutes}}:{{displaySeconds}}</h1>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      displayDays: 0,
      displayHours: 0,
      displayMinutes: 0,
      displaySeconds: 0
    };
  },
  props: ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'],
  computed: {
    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60
    },
    _hours() {
      return this._minutes * 60
    },
    _days() {
      return this._hours * 24
    },
    end() {
      return new Date(
        this.year,
        this.month,
        this.day,
        this.hour,
        this.minute,
        this.second,
        this.millisecond
      )
    }
  },
  methods: {
    showRemaining() {
      const timer = setInterval(() => {
        const now = new Date();
        const distance = this.end.getTime() - now.getTime()

        if(distance < 0) {
          clearInterval(timer);
          return
        }

        const days = Math.floor(distance / this._days)
        const hours = Math.floor((distance % this._days) / this._hours)
        const minutes = Math.floor((distance % this._hours) / this._minutes)
        const seconds = Math.floor((distance % this._minutes) / this._seconds)

        this.displayMinutes = minutes < 10 ? "0" + minutes : minutes;
        this.displaySeconds = seconds < 10 ? "0" + seconds : seconds;
        this.displayHours = hours < 10 ? "0" + hours : hours;
        this.displayDays = days < 10 ? "0" + days : days;
      }, 1000)
    }
  },
  mounted() {
    this.showRemaining()
  }
};
</script>
<style>
.counter {
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgb(65, 64, 64);
  opacity: 0.5;
  padding: 0 10px;
  border-radius: 10px;
  font-weight: 700;
  color: white;
}
</style>
