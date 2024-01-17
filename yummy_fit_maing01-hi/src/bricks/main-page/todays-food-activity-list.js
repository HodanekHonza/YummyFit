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
            <Uu5Elements.ListItem
              className={Css.list()}
              actionList={[
                {
                  icon: "uugds-delete",
                  children: "Delete",
                  primary: true,
                  onClick: () => deleteData(activity.data.id),
                },
              ]}
            >
              <div style={{ gap: 2 }}>
                <Uu5Elements.Text segment="title" bold={true}>
                  {" "}
                  {foodOrActivity ? activity.data.nameOfFood : activity.data.nameOfActivity}{" "}
                </Uu5Elements.Text>
                <Uu5Elements.Text> </Uu5Elements.Text>{" "}
                <Uu5Elements.Text> ({activity.data.calories}) kcal</Uu5Elements.Text>
              </div>
            </Uu5Elements.ListItem>
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
