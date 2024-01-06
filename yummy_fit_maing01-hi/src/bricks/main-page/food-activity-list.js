import { createVisualComponent } from "uu5g05";

const FoodActivityList = createVisualComponent({
  render({ create, list, FoodOrActivity }) {
    /*@@viewOn:example*/
    console.log(list);
    return (
      <>
        {list?.map((thing) => (
          <div key={FoodOrActivity ? thing?._id : thing?.data?._id}>
            <button onClick={() => create(FoodOrActivity ? thing?._id : thing?.data?._id)}>
              <div>
                <p> {FoodOrActivity ? thing.name : thing?.data?.name} </p>
                <p> {FoodOrActivity ? thing.calorie : thing?.data?.calorie} </p>
              </div>
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
