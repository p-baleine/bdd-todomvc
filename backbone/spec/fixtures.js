define(function() {
  return {
    Todos: {
      valid: { // response start
        status: 'OK',
        version: '1.0',
        response: {
          todos: [
            {
              id: 1,
              title: 'hogepiyo'
            },
            {
              id: 2,
              title: 'foobar'
            }
          ]
        }
      }
    }
  };
});