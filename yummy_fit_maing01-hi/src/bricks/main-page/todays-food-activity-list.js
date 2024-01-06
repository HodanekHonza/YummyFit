import { createVisualComponent } from "uu5g05";
const TodaysFoodActivityList = createVisualComponent({
  render({ deleteData, list, foodOrActivity }) {
    /*@@viewOn:example*/

    return (
      <>
        {list?.map((activity) => (
          <div key={activity.data.id}>
            <button onClick={() => deleteData(activity.data.id)}>
              <div>
                <p> {activity.data.uuIdentity} </p>
                <p> {activity.data.creationDate} </p>
                <p> {foodOrActivity ? activity.data.idOdFood : activity.data.nameOfActivity} </p>
                <p> {activity.data.duration} </p>
                <p> {activity.data.calories} </p>
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
export { TodaysFoodActivityList };
export default TodaysFoodActivityList;
//@@viewOff:exports
