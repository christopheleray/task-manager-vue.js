var app = new Vue({
  el: '#app',
  components: {
    'task': {
              props: ['task'],
              template: `
                <div class="ui segment task"
                    v-bind:class="task.completed ? 'done' : 'todo' ">
                      <div class="ui grid">
                        <div class="left floated twelve wide column">
                          <div class="ui checkbox">
                            <input type="checkbox" name="task" v-on:click="app.toggleDone($event, task.id)" :checked="task.completed">
                            <label>{{ task.name }} <span class="description"> {{ task.description}} </span></label>
                          </div>
                        </div>
                        <div class="right floated three wide column">
                          <i class="icon pencil blue" alt="Edit" v-on:click="app.editTask($event, task.id)"></i>
                          <i class="icon trash lback" alt="Delete" v-on:click="app.deleteTask($event, task.id)"></i>
                        </div>
                      </div>
                </div>
              `
            }
  },
  data: {
    tasks: [
      { id: 1, name: 'ToDo1', description: 'This is a Todo', completed: false },
      { id: 2, name: 'ToDo2', description: 'This is a another Todo', completed: false },
      { id: 3, name: 'ToDo3', description: 'This is a complete Todo', completed: true },
      { id: 4, name: 'ToDo4', description: 'This is a complete Todo', completed: true }
    ],
    task: {},
    message: '',
    action: 'create'
  }, 
  computed: {
    completedTasks: function(){
      return this.tasks.filter( item => item.completed == true );
    }, 
    todoTasks: function(){
      return this.tasks.filter( item => item.completed ==false );
    },
    nextId: function(){
      return (this.tasks.sort(function(a,b){ return a.id - b.id; }))[this.tasks.length - 1].id + 1;
    }
  }, 
  methods: {
    clear: function() {
      this.task = {};
      this.action = 'create';
      this.message =''
    },
    toggleDone: function(event, id) {
      event.stopImmediatePropagation();
      let task = this.tasks.find(item => item.id == id);
      if(task) {
        task.completed = !task.completed
        this.message = `Task ${id} updated. `
      }
    },
    createTask: function(event) {
      if(!this.task.completed){
        this.task.completed = false;
      } else {
        this.task.completed = true;
      }
      let taskId = this.nextId;
      this.task.id = taskId;
      let newTask = Object.assign({}, this.task);    
  
      this.tasks.push(this.task);
      this.clear();
      this.message = `Task ${taskId} created. `;

    },
    editTask: function(event, id) {
      this.action = 'edit'
      let task = this.tasks.find(item => item.id == id)
      if(task) {
        this.task = { id: id, 
                      name: task.name, 
                      description: task.description, 
                      completed: task.completed };
      }
    },
    updateTask: function(event, id){
      event.stopImmediatePropagation();
      event.preventDefault();
      let task = this.tasks.find(item => item.id == id);
      if(task) {
        task.name = this.task.name;
        task.description = this.task.description;
        task.completed = this.task.completed;
        this.message = `Task ${id} updated. `;
      }
    },
    deleteTask: function(event, id) {
      event.stopImmediatePropagation();
      let taskIndex = this.tasks.findIndex(item => item.id == id)
      if(taskIndex > -1) {
        this.$delete(this.tasks, taskIndex); 
        this.message = `Task ${id} deleted. `;
       
      }
    }
  }
})
