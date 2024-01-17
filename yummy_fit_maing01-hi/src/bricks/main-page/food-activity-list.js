import { createVisualComponent, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
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
      width: 500,
    }),
};
//@@viewOff:css
const FoodActivityList = createVisualComponent({
  render({ create, list, FoodOrActivity }) {
    const [inputValue, setInputValue] = useState(1);
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
                  onClick: FoodOrActivity
                    ? () => create(thing?._id, inputValue)
                    : () => create(thing?.data?._id, inputValue),
                },
              ]}
            >
              <div style={{ gap: 2 }}>
                <p> {FoodOrActivity ? thing.name : thing?.data?.name} </p>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(parseInt(e.target.value, 10) || 0)}
                />
                {"    "}
                <p>({FoodOrActivity ? thing.calorie * inputValue : thing?.data?.calorie * inputValue})kcal</p>
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
export { FoodActivityList };
export default FoodActivityList;
//@@viewOff:exports
