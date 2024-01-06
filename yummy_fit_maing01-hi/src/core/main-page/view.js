//@@viewOn:imports
import { createVisualComponent, Environment, useSession } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import { Button } from "uu5g05-elements";
import CalorieChart from "./calorie-chart.js";
import Config from "./config/config.js";
import ModalOnButton from "./modal-button.js";
import ModalOnButtonCalendar from "./model-button-calendar.js";
import DisplayDate from "./display-date.js";
import { useYummyFit } from "../yummyfit-context.js";
//@@viewOff:imports

//@@viewOn:constants
// TODO work 1h 45min
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "20px",
      gap: "10px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    //@@viewOff:private
    const {
      yummyFitDataList,
      yummyFitFoodList,
      yummyFitActivityList,
      yummyFitAchievementsList,
      TodaysActivityList,
      selectedDate,
      setSelectedDate,
      findDataForSelectedDate,
    } = useYummyFit();

    //@@viewOn:render
    return (
      <>
        <div className={Css.main()}>
          {" "}
          <ModalOnButtonCalendar
            header="Choose date"
            colorScheme="primary"
            size="l"
            content={<DisplayDate setSelectedDate={setSelectedDate} selectedDate={selectedDate} />}
          />
        </div>
        <div className={Css.main()}>
          {/* <ModalOnButton
            header="Add meal"
            // content={yummyFitFoodList.data}
            // create={yummyFitFoodList.handlerMap.create}
            size="xl"
          /> */}
          <ModalOnButton
            header="Add activity"
            content={yummyFitActivityList.data}
            todayData={TodaysActivityList.data}
            create={TodaysActivityList.handlerMap.createItem}
            deleteData={TodaysActivityList.handlerMap.delete}
            size="xl"
          />
          {/* <ModalOnButton
            header="Add water"
            // content={yummyFitFoodList.data}
            // create={yummyFitFoodList.handlerMap.create}
            size="xl"
          /> */}
        </div>
        <CalorieChart selectedDate={findDataForSelectedDate()} />
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
