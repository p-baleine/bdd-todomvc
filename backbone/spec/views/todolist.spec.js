$(function() {

  var todoItem = new Backbone.View(),
      TodoItemStub = sinon.stub().returns(todoItem),
      stubs = {
        'views/todo': TodoItemStub
      },
      context = createContext(stubs);

  context(['views/todolist'], function(TodoList) {
    describe('TodoList', function() {

      beforeEach(function() {
        this.todoList = new TodoList();
      });

      describe('描画', function() {
        beforeEach(function() {
          this.todo1 = new Backbone.Model({ id: 1 });
          this.todo2 = new Backbone.Model({ id: 2 });
          this.todo3 = new Backbone.Model({ id: 3 });
          this.todoList.collection = new Backbone.Collection([
            this.todo1,
            this.todo2,
            this.todo3
          ]);
          this.todoList.render();
        });

        it ('各todoモデルに対してTodoItemビューを描画すること', function() {
          expect(TodoItemStub).toHaveBeenCalledThrice();
        });
      });

    });
  });

});