//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Text } from "uu5g05-elements";
import Uu5ChartsBricks from "uu5chartsg01-bricks";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
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

  render(props) {
    //@@viewOn:private
    const { selectedDate } = props;
    const data = [
      {
        type: "Calories remaining",
        amount: 2200 - selectedDate?.calories,
      },
      {
        type: "Consumed",
        amount: selectedDate?.calories,
      },
    ];
    console.log(selectedDate?.calories);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div className={Css.main()}>
        <Uu5ChartsBricks.PieChart data={[data]} serieList={[{ valueKey: "amount", labelKey: "type" }]} legend />
        <Text>Selected day: {selectedDate?.date || "No record for the day"}</Text>
        <Text>Calorie goal for today: {2200 - selectedDate?.calories || "No record for the day"}</Text>
        <Text>Total calorie consumed today: {selectedDate?.calories || "No record for the day"}</Text>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CalorieChart };
export default CalorieChart;
//@@viewOff:exports
