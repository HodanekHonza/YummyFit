//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Uu5ChartsBricks from "uu5chartsg01-bricks";
import Config from "./config/config.js";
import { Box, Grid } from "uu5g05-elements";
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

    const formatDate = (isoDateString) => {
      if (!isoDateString) return "No record for the day";

      const date = new Date(isoDateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth() is zero-based
      const day = date.getDate();

      // Format: YYYY-MM-DD (pad month and day with a leading zero if needed)
      return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    };

    const gridContent = (
      <>
        <Box className={Config.Css.css({ padding: 5 })}>Selected day: {formatDate(selectedDate?.date)}</Box>
        <Box className={Config.Css.css({ padding: 5 })}>
          Remaining calories for today: {2200 - selectedDate?.calories || "No record"} kcal
        </Box>
        {/* <Box className={Config.Css.css({ padding: 5 })}>
          Total calorie consumed today: {selectedDate?.calories || "No record"} kcal
        </Box> */}
        <Box className={Config.Css.css({ padding: 5 })}>
          Total water consumed today: {selectedDate?.waterIntake || "No record"} ml
        </Box>
        <Box className={Config.Css.css({ padding: 5 })}>Calorie Goal for today: 2200</Box>
      </>
    );
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div className={Css.main()}>
        <Uu5ChartsBricks.PieChart
          className={Config.Css.css({ paddingBottom: 10 })}
          data={[data]}
          serieList={[{ valueKey: "amount", labelKey: "type" }]}
          legend
        />
        <Grid rowGap={8}>{gridContent}</Grid>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CalorieChart };
export default CalorieChart;
//@@viewOff:exports
