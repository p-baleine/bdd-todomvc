(function() {

  var stubs = {},
      context = createContext(stubs);

  context(['models/todo'], function(Todo) {
    beforeEach(function() {
      this.todo = new Todo();
      this.todo.collection = { url: '/collection url' };
    });

    describe('Todo', function() {
      describe('インスタンス生成時', function() {
        beforeEach(function() {
          this.todo = new Todo({ id: 5, title: 'hoge' });
        });

        it ('指定した属性値を保持していること', function() {
          expect(this.todo.get('title')).toEqual('hoge');
        });

        describe('優先度を指定しないで生成した場合', function() {
          it ('デフォルトの優先度3を保持していること', function() {
            expect(this.todo.get('priority')).toEqual(3);
          });
        });
      });

      describe('URL', function() {
        describe('idが付与されていない場合', function() {
          it ('コレクションのURLを保持しいていること', function() {
            expect(this.todo.url()).toEqual('/collection url');
          });
        });

        describe('idが付与されている場合', function() {
          it ('コレクションのURL + idのURLを保持しいていること', function() {
            this.todo.id = 3;
            expect(this.todo.url()).toEqual('/collection url/3');
          });
        });
      });

      describe('validation', function() {
        describe('タイトルが設定されていない場合', function() {
          it ('save()されないこと', function() {
            var eventSpy = sinon.spy();
            this.todo.on('error', eventSpy);
            this.todo.save({ 'title': '' });
            expect(eventSpy).toHaveBeenCalledOnce();
            expect(eventSpy).toHaveBeenCalledWith(this.todo,
              'タイトルを入力してください'
            );
          });
        });
      });
    });
  });

}());