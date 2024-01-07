import { createVisualComponent } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
const FoodActivityList = createVisualComponent({
  render({ create, list, FoodOrActivity }) {
    /*@@viewOn:example*/
    console.log(list);
    return (
      <>
        {list?.map((thing) => (
          <div key={FoodOrActivity ? thing?._id : thing?.data?._id}>
            <button onClick={() => create(FoodOrActivity ? thing?._id : thing?.data?._id)}>
              <Uu5Elements.ListItem>
                <p> {FoodOrActivity ? thing.name : thing?.data?.name} </p>
                {"    "}
                <p> {FoodOrActivity ? thing.calorie : thing?.data?.calorie} kcal</p>
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
export { FoodActivityList };
export default FoodActivityList;
//@@viewOff:exports
