'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    title: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {});
  TodoItem.associate = function(models) {
    // associations can be defined here
    TodoItem.belongsTo(models.TodoList, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE',
      });
  };
  return TodoItem;
};