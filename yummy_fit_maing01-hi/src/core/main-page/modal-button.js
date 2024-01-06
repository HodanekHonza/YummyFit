import { Fragment, createVisualComponent, useState, useCallback } from "uu5g05";
import { Button, Modal } from "uu5g05-elements";
import Uu5Elements from "uu5g05-elements";
const ModalOnButton = createVisualComponent({
  render({ header, create, deleteData, content, todayData, ...props }) {
    /*@@viewOn:example*/

    const [open, setOpen] = useState();

    // const createfood = useCallback(
    //   async (id, quantifaier) => {
    //     try {
    //       create({ id: id, duration: 1 });
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   },
    //   [create],
    // );

    // const deleteFood = useCallback(
    //   async (id) => {
    //     try {
    //       deleteData({ id: id });
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   },
    //   [deleteData],
    // );

    return (
      <Fragment>
        <Button size={props.size} colorScheme={props.colorScheme} onClick={() => setOpen(true)}>
          {header}
        </Button>
        <Modal header={header} open={open} onClose={() => setOpen(false)}>
          <h2> {header}</h2>
          {content?.map((thing) => (
            <div key={thing.data._id}>
              <button onClick={() => create(thing.data._id)}>
                <div>
                  <p> {thing.data.name} </p>
                  <p> {thing.data.calorie} </p>
                </div>
              </button>
            </div>
          ))}
          <h2>Todays things</h2>
          {todayData?.map((activity) => (
            <div key={activity.data.id}>
              <button onClick={() => deleteData(activity.data.id)}>
                <div>
                  <p> {activity.data.uuIdentity} </p>
                  <p> {activity.data.creationDate} </p>
                  <p> {activity.data.nameOfActivity} </p>
                  <p> {activity.data.duration} </p>
                  <p> {activity.data.calories} </p>
                </div>
              </button>
            </div>
          ))}
          <Uu5Elements.Grid
            templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
            columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
            justifyContent={{ s: "end" }}
          ></Uu5Elements.Grid>
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
