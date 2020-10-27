<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col-12 col-sm-10 col-lg-6">
        <create-todo @on-new-todo="addTodo($event)" />
      </div>
      <div class="col-12 col-sm-10 col-lg-6">
        <form class="col-12 col-sm-10 col-md-8 cl-lg-6">
          <input
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Search to-do..."
          />
        </form>
      </div>
    </div>
    <div class="row m-0">
      <div class="col-12 col-sm-10">
        <ul class="list-group">
          <todo
            v-for="(todo, index) in paginate"
            :key="index"
            :description="todo.description"
            :completed="todo.completed"
            @on-toggle="toggleTodo(todo)"
            @on-delete="deleteTodo(todo)"
            @on-edit="editTodo(todo, $event)"
          />
        </ul>
        <ul>
          <li v-for="pageNumber in totalPages" v-bind:key="pageNumber">
            <a
              v-bind:key="pageNumber"
              href="#"
              @click="setPage(pageNumber)"
              :class="{
                current: currentPage === pageNumber,
                last:
                  pageNumber == totalPages &&
                  Math.abs(pageNumber - currentPage) > 3,
                first: pageNumber == 1 && Math.abs(pageNumber - currentPage) > 3
              }"
              >{{ pageNumber }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
export default {
  data() {
    return {
      search: "",
      todos: [
        { description: "Do the dishes", completed: false },
        { description: "Take out the trash", completed: false },
        { description: "Finish doing laundry", completed: false }
      ],
      currentPage: 1,
      itemsPerPage: 3,
      resultCount: 1
    };
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push({ description: newTodo, completed: false });
    },
    toggleTodo(todo) {
      todo.completed = !todo.completed;
    },
    deleteTodo(deletedTodo) {
      this.todos = this.todos.filter(todo => todo !== deletedTodo);
    },
    editTodo(todo, newTodoDescription) {
      todo.description = newTodoDescription;
    },
    setPage: function(pageNumber) {
      this.currentPage = pageNumber;
    }
  },
  components: { Todo, CreateTodo },
  computed: {
    filteredTodoList: function() {
      var self = this;
      return this.todos.filter(function(todo) {
        return (
          todo.description.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
        );
      });
    },
    totalPages: function() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },
    paginate: function() {
      if (
        !this.filteredTodoList ||
        this.filteredTodoList.length != this.filteredTodoList.length
      ) {
        return;
      }
      this.resultCount = this.filteredTodoList.length;
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages;
      }
      var index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.filteredTodoList.slice(index, index + this.itemsPerPage);
    }
  }
};
</script>
