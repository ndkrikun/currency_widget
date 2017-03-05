var fs = require('fs');
var path = require('path');

function ClearAssets(opt) {
  this.options = opt;
}

ClearAssets.prototype.apply = function(compiler) {
  var self = this;

  compiler.plugin('emit', function(compilation, callback) {
    var list;
    var obj;
    var i;
    var j;
    var p;

    if (fs.existsSync(self.options.assets)) {
      list = fs.readdirSync(self.options.assets);
    }

    if (fs.existsSync(self.options.manifest) && list) {
      obj = JSON.parse(fs.readFileSync(self.options.manifest, 'utf8'));

      for (i in obj) {
        if (obj[i]) {
          j = list.indexOf(obj[i]);

          if (j !== -1) {
            list.splice(j, 1);
          }
        }
      }

      for (i = 0; i < list.length; i++) {
        p = path.join(self.options.assets, list[i]);

        if (fs.statSync(p).isFile()) {
          if (p !== self.options.manifest && fs.existsSync(p)) {
            fs.unlinkSync(p);
          }
        }
      }
    }

    console.log(new Date());

    callback();
  });
};

module.exports = ClearAssets;
