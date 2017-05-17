exports.index = function(req, res){
  res.render('index', { Page: 'Home', title: 'Home' });
};

exports.admin = function(req, res){
  res.render('admin', { Page: 'Admin', title: 'Admin' });
};

