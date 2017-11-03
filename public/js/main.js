var app = new Vue({
  el: '#app',
  data: {
    counter: 1,
    logs: []
  },
  methods: {
    downloadLogs: function() {
      this.$http.get('/download').then(response => {

        // get body data
        //this.logs = response.body;
        console.log('1312');

      }, response => {
        // error callback
        console.log(response);
      });
    },
    printLogs: function() {
      this.$http.get('/print').then(response => {
        this.logs = response.body;
      }, (err) => {
        console.log(err);
      });
    }
  }
});