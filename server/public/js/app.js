(() => {
  const app = {
    dataTodo: null,
    init() {
      console.log("ready !")
      this.getTasks();
    },
    getTasks() {
      fetch('/data')
        // fetch('../database/tasks.json')
        .then((res) => res.json())
        .then((data) => {
          this.dataTodo = data.taches;
          this.tasks()
        });
    },
    tasks() {
      this.dataTodo.map(this.lihtml)
    },
    lihtml(taches) {
      document.getElementById("todoUl").innerHTML += `<li id=${taches.id}>${taches.content}</li>`
    }
  };
  app.init()
})();

// npm run server