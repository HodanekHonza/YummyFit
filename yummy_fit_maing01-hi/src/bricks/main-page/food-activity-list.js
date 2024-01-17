import { createVisualComponent } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
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
const FoodActivityList = createVisualComponent({
  render({ create, list, FoodOrActivity }) {
    /*@@viewOn:example*/
    return (
      <>
        {list?.map((thing) => (
          <div key={FoodOrActivity ? thing?._id : thing?.data?._id} className={Css.main()}>
            <Uu5Elements.ListItem
              className={Css.list()}
              actionList={[
                {
                  icon: "uugds-plus",
                  children: "Add",
                  primary: true,
                  onClick: () => create(FoodOrActivity ? thing?._id : thing?.data?._id),
                },
              ]}
            >
              <p> {FoodOrActivity ? thing.name : thing?.data?.name} </p>
              {"    "}
              <p>({FoodOrActivity ? thing.calorie : thing?.data?.calorie})kcal</p>
            </Uu5Elements.ListItem>
          </div>
        ))}
      </>
    );

    /*@@viewOn:example*/
  },
});

//@@viewOn:exports
export { FoodActivityList };
export default FoodActivityList;
//@@viewOff:exports
