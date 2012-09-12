buster.spec.expose(); // Make some functions global

require(
  [
      'src/models/todo'
    , 'src/collections/todos'
  ],
  function(Todo, Todos) {
    describe('Todos collection', function() {
      before(function() {
        this.todos = new Todos();
      });

      it ('should be defined as constructor', function() { // TODO find beInstanceOf? matcher
        expect(Todos).toBeFunction();
      });

      describe('when add an array of object literals', function() {
        before(function() {
          this.spy(Todo.prototype, 'initialize');
        });

        it ('should create Todo model instance', function() {
          this.todos.add([{ id: 1 }, { id: 2 }, { id: 3 }]);
          expect(Todo.prototype.initialize).toHaveBeenCalledThrice();
        });
      });
    });
  }
);
