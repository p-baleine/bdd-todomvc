var sinon = require('sinon')
  , resource = require('../lib/resource');

describe('resource', function() {
  beforeEach(function() {
    this.app = {
      get: sinon.spy(),
      post: sinon.spy(),
      put: sinon.spy(),
      delete: sinon.spy()
    };

    this.route = resource(this.app);
  });

  describe('initialization', function() {
    it('should return function', function() {
      this.route.should.be.an.instanceOf(Function);
    });
  });

  describe('GET /path -> obj.index', function() {
    it('should route to obj', function() {
      var obj = { index: function() {} };

      this.route('/todos', obj);

      this.app.get.called.should.be.ok;
      this.app.get.args.should.includeEql(['/todos', obj.index]);
    });
  });

  describe('GET /path/:id -> obj.show', function() {
    it('should route to obj', function() {
      var obj = { show: function() {} };

      this.route('/todos', obj);

      this.app.get.called.should.be.ok;
      this.app.get.args.should.includeEql(['/todos/:id', obj.show]);
    });
  });

  describe('POST /path -> obj.create', function() {
    it('should route to obj', function() {
      var obj = { create: function() {} };

      this.route('/todos', obj);

      this.app.post.calledOnce.should.be.ok;
      this.app.post.args[0][0].should.equal('/todos');
      this.app.post.args[0][1].should.equal(obj.create);
    });
  });

  describe('PUT /path/:id -> obj.update', function() {
    it('should route to obj', function() {
      var obj = { update: function() {} };

      this.route('/todos', obj);

      this.app.put.calledOnce.should.be.ok;
      this.app.put.args[0][0].should.equal('/todos/:id');
      this.app.put.args[0][1].should.equal(obj.update);
    });
  });

  describe('DELETE /path/:id -> obj.destroy', function() {
    it('should route to obj', function() {
      var obj = { destroy: function() {} };

      this.route('/todos', obj);

      this.app.delete.calledOnce.should.be.ok;
      this.app.delete.args[0][0].should.equal('/todos/:id');
      this.app.delete.args[0][1].should.equal(obj.destroy);
    });
  });
});