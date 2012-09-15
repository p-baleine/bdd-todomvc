var resource = module.exports = function(app) {

  return function(path, obj) {

    /**
     * GET /<path>        -> obj.index
     */
    app.get(path, obj.index);

    /**
     * GET /<path>/:id    -> obj.show
     */
    app.get(path + '/:id', obj.show);

    /**
     * POST /<path>       -> obj.create
     */
    app.post(path, obj.create);

    /**
     * PUT /<path>/:id    -> obj.update
     */
    app.put(path + '/:id', obj.update);

    /**
     * DELETE /<path>/:id -> obj.destroy
     */
    app.delete(path + '/:id', obj.destroy);
  };

};