//@@viewOn:imports
import { createVisualComponent, Environment, useSession, useCallback } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
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

    const { addAlert } = useAlertBus();
    const showError = useCallback(
      async (error, header = "") => {
        addAlert({
          header,
          message: error.message,
          priority: "error",
        });
      },
      [addAlert],
    );

    const createfood = useCallback(
      async (id, quantifaier) => {
        try {
          TodaysActivityList.handlerMap.createItem({ id: id, duration: 1 });
          addAlert({
            message: `Activity ${"..."} has been created.`,
            priority: "success",
            durationMs: 2000,
          });
        } catch (error) {
          View.logger.error("Error creating activity", error);
          showError(error, "Activity create failed!");
        }
      },
      [TodaysActivityList.handlerMap, addAlert, showError],
    );

    const deleteFood = useCallback(
      async (id) => {
        try {
          TodaysActivityList.handlerMap.delete({ id: id });
          addAlert({
            message: `Activity ${"..."} has been deleted.`,
            priority: "faileure",
            durationMs: 2000,
          });
        } catch (error) {
          View.logger.error("Error deleting activity", error);
          showError(error, "Activity delete failed!");
        }
      },
      [TodaysActivityList.handlerMap, addAlert, showError],
    );

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
            create={createfood}
            deleteData={deleteFood}
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
