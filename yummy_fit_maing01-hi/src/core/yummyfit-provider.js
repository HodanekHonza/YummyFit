//@@viewOn:imports
import {
  createComponent,
  Utils,
  useState,
  useSession,
  useDataList,
  useEffect,
  useRef,
  useDataObject,
  useScreenSize,
} from "uu5g05";
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [selectedDate, setSelectedDate] = useState(today);
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
        createItem: handleCreateTodaysActivity,
        delete: handleDeleteTodaysActivity,
      },
      pageSize: 1,
    });

    useEffect(() => {
      async function reloadData() {
        console.log(TodaysActivityList);
        if (TodaysActivityList.state === "ready") {
          return;
        }

        if (TodaysActivityList.handlerMap && typeof TodaysActivityList.handlerMap.load === "function") {
          try {
            await TodaysActivityList.handlerMap.load();
            await yummyFitDataList.handlerMap.load();
          } catch (error) {
            console.log(error);
          }
        }
      }
      reloadData();
    }, [TodaysActivityList, yummyFitDataList]);

    //Function for finfing selected date, all black magic with date management
    const findDataForSelectedDate = () => {
      if (!yummyFitDataList.data?.list?.dailySummary) {
        return null;
      }

      const offset = selectedDate.getTimezoneOffset();
      const localSelectedDate = new Date(selectedDate.getTime() - offset * 60000);
      const formattedSelectedDate = localSelectedDate.toISOString().split("T")[0];

      return yummyFitDataList.data.list.dailySummary.find((item) => {
        const localItemDate = new Date(new Date(item.date).getTime() - offset * 60000);
        const itemDate = localItemDate.toISOString().split("T")[0];
        return itemDate === formattedSelectedDate;
      });
    };

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
      selectedDate,
      setSelectedDate,
      findDataForSelectedDate,
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
