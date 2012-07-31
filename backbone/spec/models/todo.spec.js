require([
    'models/todo'
  , 'util'
  , 'sinon'
  , 'backbone'
  , 'jasmine_sinon'
], function(TodoModel, util, sinon) {

  describe('TodoModel', function() {
    beforeEach(function() {
      this.todo = new TodoModel({
        title: 'hoge'
      });
      this.todo.collection = {
        url: '/collection url'
      };
    });

    describe('インスタンス生成時', function() {
      it ('指定したプロパティを保持していること', function() {
        expect(this.todo.get('title')).toEqual('hoge');
      });

      it ('デフォルトの優先度を保持していること', function() {
        expect(this.todo.get('priority')).toEqual(3);
      });
    });

    // validationのspecに先立って、validation時のsave(), set()時に利用される
    // urlプロパティをチェック
    describe('URL', function() {
      describe('idを持っていない場合', function() {
        it ('コレクションのURLを保持していること', function() {
          expect(this.todo.url()).toEqual('/collection url');
        });
      });

      describe('idを持っている場合', function() {
        it ('コレクションのURL + idを保持していること', function() {
          this.todo.id = 1;
          expect(this.todo.url()).toEqual('/collection url/1');
        });
      });
    });

    describe('validation', function() {
      it ('タイトルが空の場合saveされないこと', function() {
        var eventSpy = sinon.spy();
        this.todo.on('error', eventSpy);
        this.todo.save({ 'title': '' });
        expect(eventSpy).toHaveBeenCalledOnce();
        expect(eventSpy).toHaveBeenCalledWith(this.todo, 'cannot have an empty title');
      });
    });
  });
});