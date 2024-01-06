import { Fragment, createVisualComponent, useState, useCallback } from "uu5g05";
import { Button, Modal } from "uu5g05-elements";
import Uu5Elements from "uu5g05-elements";
const ModalOnButtonCalendar = createVisualComponent({
  render({ header, create, deleteData, content, todayData, ...props }) {
    /*@@viewOn:example*/
    //console.log(todayData);
    const [open, setOpen] = useState();

    return (
      <Fragment>
        <Button size={props.size} colorScheme={props.colorScheme} onClick={() => setOpen(true)}>
          {header}
        </Button>
        <Modal header={header} open={open} onClose={() => setOpen(false)}>
          {content}
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
export { ModalOnButtonCalendar as ModalOnButton };
export default ModalOnButtonCalendar;
//@@viewOff:exports
