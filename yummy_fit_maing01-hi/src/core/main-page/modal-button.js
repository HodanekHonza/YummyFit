import { Fragment, createVisualComponent, useState } from "uu5g05";
import { Button, Modal } from "uu5g05-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
const ModalOnButton = createVisualComponent({
  render({ header, ...props }) {
    /*@@viewOn:example*/

    function createfood(id) {
      try {
        //console.log(id);
        props.create({ id: id, quantity: 1 });
      } catch (e) {
        console.log(e);
      }
    }

    const [open, setOpen] = useState();
    return (
      <Fragment>
        <Button size={props.size} colorScheme={props.colorScheme} onClick={() => setOpen(true)}>
          {header}
        </Button>
        <Modal {...props} header={header} open={open} onClose={() => setOpen(false)}>
          {Array.isArray(props.content) &&
            props.content.map((thing) => (
              <div key={thing._id}>
                <Button onClick={() => createfood(thing._id)}>
                  <div>
                    <p> {thing.name} </p>
                    <p> {thing.calorie} </p>
                  </div>
                </Button>
              </div>
            ))}
          <Uu5Elements.Grid
            templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
            columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
            justifyContent={{ s: "end" }}
          >
            <Uu5Forms.CancelButton onClick={() => setOpen(false)} />
            <Uu5Forms.SubmitButton icon="uugds-check">Confirm</Uu5Forms.SubmitButton>
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
