require([
    'myutil'
  , 'views/todolist'
  , 'sinon'
  , 'testr'
  , 'backbone'
  , 'jasmine_jquery'
], function(util) {

  describe('TodoListView', function() {
    beforeEach(function() {
      this.todoViewStub = sinon.stub().returns(new Backbone.View());
      this.TodoListView = testr('views/todolist', {
        'views/todo': this.todoViewStub
      });
      this.view = new this.TodoListView();
    });

    describe('インスタンス生成時', function() {
      it ('リストのルート要素を持っていること', function() {
        expect(this.view.el.tagName).toEqual('UL');
      });

      it ('クラス`todos`を持っていること', function() {
        expect(this.view.$el).toHaveClass('todos');
      });
    });

    describe('描画', function() {
      beforeEach(function() {
        this.todo1 = new Backbone.Model({ id: 1 });
        this.todo2 = new Backbone.Model({ id: 2 });
        this.todo3 = new Backbone.Model({ id: 3 });
        this.view.collection = new Backbone.Collection([
          this.todo1,
          this.todo2,
          this.todo3
        ]);
        this.view.render();
      });

      it ('各todoモデルについてTodoビューを生成すること', function() {
        expect(this.todoViewStub).toHaveBeenCalledThrice();
        expect(this.todoViewStub).toHaveBeenCalledWith({ model: this.todo1 });
        expect(this.todoViewStub).toHaveBeenCalledWith({ model: this.todo2 });
        expect(this.todoViewStub).toHaveBeenCalledWith({ model: this.todo3 });
      });
    });
  });
});