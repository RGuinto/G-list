var dbName = 'todo_list_store_2';

sklad.open(dbName, {
  version: 2,
  migration: {
    '1': function (database) {
      var objStore = database.createObjectStore('todos', {autoIncrement: true});
      objStore.createIndex('description_search', 'description', {unique: true});
    },
    '2': function (database) {
      database.deleteObjectStore('todos');
      var objStore = database.createObjectStore('todos', {
        autoIncrement: true,
        keyPath: 'timestamp'
      });
      objStore.createIndex('description_search', 'description', {unique: true});
      objStore.createIndex('done', 'done', {unique: false});
    }
  }
}, function (err, conn) {
  if (err) { throw err; }
  $(function () {
    var $description = $('#description');
    var $add         = $('#add');
    var $list        = $('#list');
    var food = ["BANANA","APPLE"];
    var len = food.length;
    for (var i=0;i<len;i++){

        food.push(food[i].toLowerCase());
    }

    var rist = document.getElementsByTagName("li");
    for (each item in the list in ul){
      for(var i=0;i<=food.length;i++){
        if (description[i] == food[j]){
          $li[i].attr('class', 'keyword');
        }
      }
    }
    
    function updateRows(conn) {
      conn
        .get({
          todos: {description: sklad.DESC, index: 'description_search'}
        }, function (err, data) {
          if (err) { return console.error(err); }
          
          $list.empty();
          data.todos.forEach(function (todo) {
            var $li = $(document.createElement('li'));
            if (todo.value.done) {
              $li.css({textDecoration: 'line-through'});
            }
            $li.text(todo.value.description);
            console.log(todo);
            $li.click(function () {
              todo.value.done = true;
              conn.upsert('todos', todo.value, function (err) {
                if (err) { return console.error(); }
                updateRows(conn);
              })
            });
            $list.append($li);
          });
        });
    }
 
    updateRows(conn);
    $add.click(function () {
      if (!$description.val().trim()) {
        return;
      }

      for(var i=0;i<=food.length;i++){
        if ($description.val().trim() == food[i]){
          $li[i].attr('class', 'keyword');
        }
      }

      conn.insert({
        todos: [
          {
            timestamp: Date.now(),
            description: $description.val().trim(),
            done: false
          }
        ]
      }, function (err, insertedKeys) {
        if (err) { return console.error(err); }
        $description.val('');
        updateRows(conn);
      })
    });
  });
});