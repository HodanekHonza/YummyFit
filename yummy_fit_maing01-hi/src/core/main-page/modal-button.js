import { Fragment, createVisualComponent, useState } from "uu5g05";
import Uu5Elements, { Button, Modal } from "uu5g05-elements";
import FoodActivityList from "../../bricks/main-page/food-activity-list";
import TodaysFoodActivityList from "../../bricks/main-page/todays-food-activity-list";
const ModalOnButton = createVisualComponent({
  render({ header, create, deleteData, content, todayData, FoodOrActivity, ...props }) {
    /*@@viewOn:example*/

    const [open, setOpen] = useState();
    const [foodOrActivityList, setFoodOrActivityList] = useState(false);

    return (
      <Fragment>
        <Button size={props.size} colorScheme={props.colorScheme} onClick={() => setOpen(true)}>
          {header}
        </Button>
        <Modal header={header} open={open} onClose={() => setOpen(false)}>
          <Uu5Elements.Tabs
            itemList={[
              {
                label: FoodOrActivity ? "Food List" : "Activity List",
                children: (
                  <>
                    <h2>{FoodOrActivity ? "Add Food to your day" : "Add Activity to your day"}</h2>
                    <FoodActivityList create={create} list={content} FoodOrActivity={FoodOrActivity} />
                  </>
                ),
              },
              {
                label: FoodOrActivity ? "Today Food List" : "Today Activity List",
                children: (
                  <>
                    <h3>{FoodOrActivity ? "Todays Food" : "Todays Activity"}</h3>
                    <TodaysFoodActivityList deleteData={deleteData} list={todayData} foodOrActivity={FoodOrActivity} />
                  </>
                ),
              },
            ]}
          />
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
