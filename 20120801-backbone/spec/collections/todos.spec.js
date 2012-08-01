require([
    'myutil'
  , 'spec/fixtures'
  , 'spec/helper'
  , 'collections/todos'
  , 'testr'
  , 'backbone'
], function(util, fixtures, helper, TodosCollection) {
  describe('TodosCollection', function() {
    beforeEach(function() {
      // TodoModelのスタブ
      this.todoModelStub = sinon.stub().returns(new Backbone.Model());
      this.TodosCollection = testr('collections/todos', {
        'models/todo': this.todoModelStub
      });
      this.todos = new this.TodosCollection();
    });

    describe('モデルリテラルと共にインスタンス生成した場合', function() {
      beforeEach(function() {
        this.todos.add(new Backbone.Model({ id: 5, 'title': 'piyo' }));
      });
      it ('モデルを追加していること', function() {
        expect(this.todos.length).toEqual(1);
      });

      it ('モデルをidで検索できること', function() {
        expect(this.todos.get(5).get('title')).toEqual('piyo');
      });
    });

    describe('ソート', function() {
      beforeEach(function() {
        this.todo1 = new Backbone.Model({ id: 1, title: 'todo1', priority: 3 });
        this.todo2 = new Backbone.Model({ id: 2, title: 'todo1', priority: 2 });
        this.todo3 = new Backbone.Model({ id: 3, title: 'todo1', priority: 1 });
      });

      it ('モデルを優先度順でソートしていること', function() {
        this.todos.add([this.todo1, this.todo2, this.todo3]);
        expect(this.todos.at(0)).toBe(this.todo3);
        expect(this.todos.at(1)).toBe(this.todo2);
        expect(this.todos.at(2)).toBe(this.todo1);
      });
    });

    describe('サーバ疎通', function() {
      beforeEach(function() {
        this.fixture = fixtures.Todos.valid;
        this.server = sinon.fakeServer.create();
        this.server.respondWith(
          'GET',
          '/todos',
          helper.validResponse(this.fixture)
        );
        this.todos = new this.TodosCollection();
      });

      afterEach(function() {
        this.server.restore();
      });

      it ('正しいリクエストを生成すること', function() {
        this.todos.fetch();
        expect(this.server.requests.length).toEqual(1);
        expect(this.server.requests[0].method).toEqual('GET');
        expect(this.server.requests[0].url).toEqual('/todos');
      });

      it ('レスポンスをパースしてTODOを生成すること', function() {
        this.todos.fetch();
        this.server.respond();
        expect(this.todos.length).toEqual(this.fixture.response.todos.length);
        expect(this.todos.get(1).get('title')).toEqual('hogepiyo');
      });
    });
  });
});