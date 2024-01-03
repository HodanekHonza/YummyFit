import { Fragment, createVisualComponent, useState, useCallback } from "uu5g05";
import { Button, Modal } from "uu5g05-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
const ModalOnButton = createVisualComponent({
  render({ header, ...props }) {
    /*@@viewOn:example*/
    console.log(props.todayData);
    const [open, setOpen] = useState();

    // Wrapped in useCallback
    const createfood = useCallback(
      async (id, quantifaier) => {
        try {
          props.create({ id: id, duration: 1 });
        } catch (e) {
          console.log(e);
        }
      },
      [props.create],
    ); // Dependency on props.create

    // Wrapped in useCallback
    const deleteFood = useCallback(
      async (id) => {
        try {
          props.delete({ id: id });
        } catch (e) {
          console.log(e);
        }
      },
      [props.delete],
    ); // Dependency on props.delete

    return (
      <Fragment>
        <Button size={props.size} colorScheme={props.colorScheme} onClick={() => setOpen(true)}>
          {header}
        </Button>
        <Modal {...props} header={header} open={open} onClose={() => setOpen(false)}>
          <h2>Choose Activity</h2>
          {props.content?.map((thing) => (
            <div key={thing.data._id}>
              <button onClick={() => createfood(thing.data._id)}>
                <div>
                  <p> {thing.data.name} </p>
                  <p> {thing.data.calorie} </p>
                </div>
              </button>
            </div>
          ))}
          <h2>Todays things</h2>
          {props.todayData?.map((activity) => (
            <div key={activity.data.id}>
              <button onClick={() => deleteFood(activity.data.id)}>
                <div>
                  <p> {activity.data.uuIdentity} </p>
                  <p> {activity.data.creationDate} </p>
                  <p> {activity.data.idOfActivity} </p>
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
          >
            {/* <Uu5Forms.SubmitButton icon="uugds-check">Confirm</Uu5Forms.SubmitButton> */}
          </Uu5Elements.Grid>
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
