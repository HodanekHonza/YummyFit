//@@viewOn:imports
import { createComponent, useState } from "uu5g05";

import Config from "./config/config";
//@@viewOff:imports

const INITIAL_VALUE = [
  {
    day: "1",
    calorieGoal: 2100,
    achievedCals: 700
  },
  {
    day: "2",
    calorieGoal: 2100,
    achievedCals: 1500
  },
  {
    day: "3",
    calorieGoal: 2100,
    achievedCals: 300
  },
  {
    day: "4",
    calorieGoal: 2100,
    achievedCals: 950
  },
  {
    day: "5",
    calorieGoal: 2100,
    achievedCals: 100
  }
];

export const CalorieProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CalorieProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [calories, setCalories] = useState(INITIAL_VALUE);

    const value = {
      shoppingListList,
      userShoppingList,
      handleCreate: (dtoIn) => handleCreate(dtoIn, setCalories),
      handleUpdate: (dtoIn) => handleUpdate(dtoIn, setCalories),
      handleDelete: (dtoIn) => handleDelete(dtoIn, setCalories),
    };
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ShoppingListListContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </ShoppingListListContext.Provider>
    );
    //@@viewOff:render
  },
});

function handleCreate(dtoIn, setCalories) {
  setCalories((current) => {
    const newSchoppingListList = current.slice();
    newSchoppingListList.push(dtoIn);
    return newSchoppingListList;
  });
}

function handleUpdate(dtoIn, setCalories) {
  setCalories((current) => {
    const newSchoppingListList = current.slice();
    const shoppingListIndex = newSchoppingListList.findIndex((item) => item.id === dtoIn.id);
    newSchoppingListList[shoppingListIndex] = dtoIn;
    return newSchoppingListList;
  });
}

function handleToggleState(dtoIn, setCalories) {
  setCalories((current) => {
    const newSchoppingListList = current.slice();
    const shoppingListIndex = newSchoppingListList.find((item) => item.id === dtoIn.id);
    dtoIn.archived = !dtoIn.archived;
    newSchoppingListList[shoppingListIndex] = dtoIn;
    return newSchoppingListList;
  });
}

function handleDelete(dtoIn, setCalories) {
  setCalories((current) => {
    const newSchoppingListList = current.slice();
    const index = newSchoppingListList.findIndex((item) => item.id === dtoIn.id);
    if (index >= 0) newSchoppingListList.splice(index, 1);
    return newSchoppingListList;
  });
}

export default CalorieProvider;