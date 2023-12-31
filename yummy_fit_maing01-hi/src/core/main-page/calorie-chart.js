//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Text } from "uu5g05-elements";
import Uu5ChartsBricks from "uu5chartsg01-bricks";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const data = [
  {
    type: "Calories remaining",
    amount: 700,
  },
  {
    type: "Achieved",
    amount: 1400,
  },
];
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "60vh",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const CalorieChart = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CalorieChart",
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    const sum = data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.amount;
    }, 0);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div className={Css.main()}>
        <Uu5ChartsBricks.PieChart data={[data]} serieList={[{ valueKey: "amount", labelKey: "type" }]} legend />
        <Text>Calorie goal for today: {sum}</Text>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CalorieChart };
export default CalorieChart;
//@@viewOff:exports
