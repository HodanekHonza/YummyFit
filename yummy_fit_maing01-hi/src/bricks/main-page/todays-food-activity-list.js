import { createVisualComponent } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
const TodaysFoodActivityList = createVisualComponent({
  render({ deleteData, list, foodOrActivity }) {
    /*@@viewOn:example*/
    return (
      <>
        {list?.map((activity) => (
          <div key={activity.data.id}>
            <button onClick={() => deleteData(activity.data.id)}>
              <Uu5Elements.ListItem>
                <Uu5Elements.Text> {activity.data.uuIdentity} </Uu5Elements.Text>
                <Uu5Elements.Text> {activity.data.creationDate} </Uu5Elements.Text>
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
