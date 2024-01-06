import { Fragment, createVisualComponent, useState } from "uu5g05";
import { Button, Modal } from "uu5g05-elements";
import FoodActivityList from "../../bricks/main-page/food-activity-list";
import TodaysFoodActivityList from "../../bricks/main-page/todays-food-activity-list";
const ModalOnButton = createVisualComponent({
  render({ header, create, deleteData, content, todayData, FoodOrActivity, ...props }) {
    /*@@viewOn:example*/

    const [open, setOpen] = useState();

    return (
      <Fragment>
        <Button size={props.size} colorScheme={props.colorScheme} onClick={() => setOpen(true)}>
          {header}
        </Button>
        <Modal header={header} open={open} onClose={() => setOpen(false)}>
          <h2>{FoodOrActivity ? "Add Food to your day" : "Add Activity to your day"}</h2>
          {FoodOrActivity ? (
            <FoodActivityList create={create} list={content} FoodOrActivity={FoodOrActivity} />
          ) : (
            <FoodActivityList create={create} list={content} FoodOrActivity={FoodOrActivity} />
          )}
          <h3>{FoodOrActivity ? "Todays Food" : "Todays Activity"}</h3>
          {FoodOrActivity ? (
            <TodaysFoodActivityList deleteData={deleteData} list={todayData} foodOrActivity={FoodOrActivity} />
          ) : (
            <TodaysFoodActivityList deleteData={deleteData} list={todayData} foodOrActivity={FoodOrActivity} />
          )}
        </Modal>
      </Fragment>
    );

    /*@@viewOn:example*/
  },
});

//@@viewOn:exports
export { ModalOnButton };
export default ModalOnButton;
//@@viewOff:exports
