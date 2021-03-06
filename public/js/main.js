var app = new Vue({
  el: '#app',
  data: {
    offset: 0,
    activeCount: 20,
    logsAreReady: false,
    donwloadingIsRunning: false,
    printingIsRunning: false,
    logs: []
  },
  computed: {
    processIsRunning: function() {
      const processing = (this.donwloadingIsRunning || this.printingIsRunning);
      return processing;
    }
  },
  methods: {
    downloadLogs: function() {
      this.donwloadingIsRunning = true;
      this.$http.get('/download').then(response => {
        this.logsAreReady = true;
        this.donwloadingIsRunning = false;
        console.log('Логи загружены');
      }, err => {
        // error callback
        console.log(err);
        this.donwloadingIsRunning = false;
        alert('Ошибка сервера');
      });
    },
    printLogs: function() {

      const data = {
        offset: this.offset,
        activeCount: this.activeCount
      };
      this.printingIsRunning = true;

      this.$http.post('/print', data, {
        emulateJSON: true
      }).then(response => {
        this.logs = this.logs.concat(response.body);
        this.offset += 20;
        this.printingIsRunning = false;
      }, (err) => {
        console.log(err);
        this.printingIsRunning = false;
        alert('Ошибка сервера');
      });
    },
    removeLogs: function() {
      this.$http.get('/removeLogs').then((response) => {
        this.logsAreReady = false;
      }, (err) => {
        console.log(err);
        alert('Ошибка сервера');
      });
    },
    clearPrintedLogs: function() {
      this.logs = [];
      this.offset = 0;
    }
  },
  created: function() {
    this.$http.get('/checkLogs').then(response => {
      this.logsAreReady = response.body.logsExist;
    }, (err) => {
      console.log(err);
      alert('Ошибка сервера');
    });
  }
});