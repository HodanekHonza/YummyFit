import { Fragment, createVisualComponent, useState } from "uu5g05";
import { Button, Modal } from "uu5g05-elements";
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
