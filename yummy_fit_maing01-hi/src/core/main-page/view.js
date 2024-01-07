//@@viewOn:imports
import { createVisualComponent, useCallback } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import CalorieChart from "./calorie-chart.js";
import Config from "./config/config.js";
import ModalOnButton from "./modal-button.js";
import ModalOnButtonCalendar from "./modal-button-calendar.js";
import ModalOnButtonWater from "./modal-button-water.js";
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
      TodaysFoodList,
      selectedDate,
      setSelectedDate,
      findDataForSelectedDate,
      TodaysWaterList,
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

    const createActivity = useCallback(
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

    const deleteActivity = useCallback(
      async (id) => {
        try {
          TodaysActivityList.handlerMap.delete({ id: id });
          addAlert({
            message: `Activity ${"..."} has been deleted.`,
            priority: "success",
            durationMs: 2000,
          });
        } catch (error) {
          View.logger.error("Error deleting activity", error);
          showError(error, "Activity delete failed!");
        }
      },
      [TodaysActivityList.handlerMap, addAlert, showError],
    );

    const createFood = useCallback(
      async (id, quantifaier) => {
        try {
          TodaysFoodList.handlerMap.createItem({ id: id, quantity: 1 });
          addAlert({
            message: `Food ${"..."} has been created.`,
            priority: "success",
            durationMs: 2000,
          });
        } catch (error) {
          View.logger.error("Error creating Food", error);
          showError(error, "Food create failed!");
        }
      },
      [TodaysFoodList.handlerMap, addAlert, showError],
    );

    const deleteFood = useCallback(
      async (id) => {
        try {
          TodaysFoodList.handlerMap.delete({ id: id });
          addAlert({
            message: `Food ${"..."} has been deleted.`,
            priority: "success",
            durationMs: 2000,
          });
        } catch (error) {
          View.logger.error("Error deleting Food", error);
          showError(error, "Food delete failed!");
        }
      },
      [TodaysFoodList.handlerMap, addAlert, showError],
    );

    const createWater = useCallback(
      async (amount) => {
        try {
          TodaysWaterList.handlerMap.createItem({ waterAmount: amount });
          addAlert({
            message: `Water ${"..."} has been Added.`,
            priority: "success",
            durationMs: 2000,
          });
        } catch (error) {
          View.logger.error("Error adding Water", error);
          showError(error, "Water create failed!");
        }
      },
      [TodaysWaterList.handlerMap, addAlert, showError],
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
          <ModalOnButton
            header="Add meal"
            FoodOrActivity={true}
            content={yummyFitFoodList.data}
            todayData={TodaysFoodList.data}
            create={createFood}
            deleteData={deleteFood}
            size="xl"
          />
          <ModalOnButton
            header="Add activity"
            FoodOrActivity={false}
            content={yummyFitActivityList.data}
            todayData={TodaysActivityList.data}
            create={createActivity}
            deleteData={deleteActivity}
            size="xl"
          />
          <ModalOnButtonWater header="Add water" create={createWater} size="xl" />
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
