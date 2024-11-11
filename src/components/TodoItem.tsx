import React from "react";
import { Todo } from "../types";

import { Checkbox } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  isFirst: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, isFirst }) => {
  return (
    <>
      {!isFirst && <Divider component="li" />}
      <ListItem
        className={`todo-item ${todo.completed ? "completed" : ""}`}
        onClick={() => onToggle(todo.id)}
      >
        <Checkbox
          defaultChecked
          color="success"
          checked={todo.completed}
          readOnly
        />
        <span>{todo.text}</span>
      </ListItem>
    </>
  );
};

export default TodoItem;
