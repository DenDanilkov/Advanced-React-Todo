'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoList = sequelize.define('TodoList', {
    title: DataTypes.STRING
  }, {});
  TodoList.associate = function(models) {
    // associations can be defined here
    TodoList.hasMany(models.TodoItem, {
      foreignKey: 'todoId',
      })
  };
  return TodoList;
};