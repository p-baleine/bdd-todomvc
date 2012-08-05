(function() {

  var Model = Backbone.Model,
      stubs = {
        'models/todo': Model
      },
      context = createContext(stubs);

  context(['collections/todos'], function(Todos) {
    describe('Todos', function() {
      beforeEach(function() {
        this.todos = new Todos();
      });

      describe('モデルリテラルを追加した場合', function() {
        beforeEach(function() {
          this.todos.add({ id: 5, title: 'hoge' });
        });

        it ('保持しているモデルの数が1増えていること', function() {
          expect(this.todos.length).toEqual(1);
        });

        it ('追加したモデルを保持していること', function() {
          expect(this.todos.get(5).get('title')).toEqual('hoge');
        });
      });

      describe('ソート', function() {
        beforeEach(function() {
          this.todo1 = new Model({ id: 1, priority: 3 });
          this.todo2 = new Model({ id: 2, priority: 2 });
          this.todo3 = new Model({ id: 3, priority: 1 });
        });

        it ('優先度順にソートすること', function() {
          this.todos.add([this.todo1, this.todo2, this.todo3]);
          expect(this.todos.at(0).id).toEqual(this.todo3.id);
          expect(this.todos.at(1).id).toEqual(this.todo2.id);
          expect(this.todos.at(2).id).toEqual(this.todo1.id);
        });
      });
    });
  });

})();