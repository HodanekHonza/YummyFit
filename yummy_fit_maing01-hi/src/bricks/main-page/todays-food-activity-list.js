import { createVisualComponent } from "uu5g05";
import Config from "../config/config";
import Uu5Elements from "uu5g05-elements";
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
  list: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 400,
    }),
};
//@@viewOff:css

const TodaysFoodActivityList = createVisualComponent({
  render({ deleteData, list, foodOrActivity }) {
    /*@@viewOn:example*/
    return (
      <>
        {list?.map((activity) => (
          <div key={activity.data.id} className={Css.main()}>
            <button onClick={() => deleteData(activity.data.id)}>
              <Uu5Elements.ListItem
                className={Css.list()}
                actionList={[
                  {
                    icon: "uugds-delete",
                    children: "Delete",
                    primary: true,
                  },
                ]}
              >
                <Uu5Elements.Text segment="title" bold={true}>
                  {" "}
                  {foodOrActivity ? activity.data.idOdFood : activity.data.nameOfActivity}{" "}
                </Uu5Elements.Text>
                <Uu5Elements.Text> {foodOrActivity ? activity.data.amount : activity.data.duration} </Uu5Elements.Text>
                <Uu5Elements.Text> {activity.data.calories} </Uu5Elements.Text>
              </Uu5Elements.ListItem>
            </button>
          </div>
        ))}
      </>
    );

    /*@@viewOn:example*/
  },
});

//@@viewOn:exports
export { TodaysFoodActivityList };
export default TodaysFoodActivityList;
//@@viewOff:exports
