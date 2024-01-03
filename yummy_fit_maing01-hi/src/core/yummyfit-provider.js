//@@viewOn:imports
import { createComponent, Utils, useState, useSession, useDataList, useEffect, useRef, useDataObject } from "uu5g05";
import Config from "./config/config";
import Context from "./yummyfit-context";
import Calls from "calls";
//@@viewOff:imports

const YummyFitProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "YummyFitProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const yummyFitDataList = useDataObject({
      handlerMap: {
        load: handleLoad,
      },
      itemHandlerMap: {},
      pageSize: 1,
    });

    const yummyFitFoodList = useDataObject({
      handlerMap: {
        load: handleLoadFood,
        create: handleCreateFood,
      },
      itemHandlerMap: {},
      pageSize: 1,
    });

    const yummyFitActivityList = useDataList({
      handlerMap: {
        load: handleLoadActivity,
        update: handleCreateActivity,
      },
      itemHandlerMap: {},
      pageSize: 1,
    });

    const yummyFitAchievementsList = useDataObject({
      handlerMap: {
        load: handleLoadAchievements,
      },
      itemHandlerMap: {},
      pageSize: 1,
    });

    const TodaysActivityList = useDataList({
      handlerMap: {
        load: handleListTodayActivity,
        update: handleCreateTodaysActivity,
        delete: handleDeleteTodaysActivity,
      },
      pageSize: 1,
    });

    // calls
    function handleLoad(dtoIn) {
      return Calls.YummyFit.load(dtoIn);
    }

    function handleLoadFood(dtoIn) {
      return Calls.YummyFit.loadFood({ category: "food" });
    }

    function handleLoadActivity(dtoIn) {
      return Calls.YummyFit.loadFood({ category: "activity" });
    }

    function handleLoadAchievements(dtoIn) {
      return Calls.YummyFit.loadFood({ category: "achievements" });
    }

    function handleCreateFood(dtoIn) {
      return Calls.YummyFit.createFood(dtoIn);
    }

    function handleListTodayActivity(dtoIn) {
      return Calls.YummyFit.loadTodaysActivity(dtoIn);
    }

    function handleCreateActivity(dtoIn) {
      return Calls.YummyFit.createActivity(dtoIn);
    }

    function handleCreateTodaysActivity(dtoIn) {
      return Calls.YummyFit.createTodaysActivity(dtoIn);
    }

    function handleDeleteTodaysActivity(dtoIn) {
      return Calls.YummyFit.deleteTodaysActivity(dtoIn);
    }

    //@@viewOn:render
    const value = {
      yummyFitDataList,
      yummyFitFoodList,
      yummyFitActivityList,
      yummyFitAchievementsList,
      TodaysActivityList,
    };

    return (
      <Context.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </Context.Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { YummyFitProvider };
export default YummyFitProvider;
//@@viewOff:exports
