buster.spec.expose();

describe('Todo model', function() {
  var Backbone = require('solutionio-backbone/index.js')
    , Todo = require('backbone-component/src/models/todo');

  it('should be a constructor', function() {
    expect(Todo).toBeFunction();
  });

  describe('id attribute', function() {
    describe('when `_id` is provided', function() {
      it('should be stored in id property', function() {
        var todo = new Todo({ _id: 999 });

        expect(todo.id).toEqual(999);
      });
    });
  });
});
