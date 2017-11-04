var app = new Vue({
  el: '#app',
  data: {
    offset: 0,
    activeCount: 20,
    logs: []
  },
  methods: {
    downloadLogs: function() {

      this.$http.get('/download').then(response => {
        console.log('Логи загружены');
      }, err => {
        // error callback
        console.log(err);
      });
    },
    printLogs: function() {

      const data = {
        offset: this.offset
      };
      this.$http.post('/print', data, {
        emulateJSON: true
      }).then(response => {
        this.logs = this.logs.concat(response.body);
        this.offset += 20;
      }, (err) => {
        console.log(err);
      });
    }
  }
});