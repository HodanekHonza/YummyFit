import { Fragment, createVisualComponent, useState } from "uu5g05";
import { Button, Input, Modal } from "uu5g05-elements";
const ModalOnButtonWater = createVisualComponent({
  render({ header, content, ...props }) {
    /*@@viewOn:example*/
    //console.log(todayData);
    const [open, setOpen] = useState();

    return (
      <Fragment>
        <Button size={props.size} colorScheme={props.colorScheme} onClick={() => setOpen(true)}>
          {header}
        </Button>
        <Modal header={header} open={open} onClose={() => setOpen(false)}>
          <Input />
        </Modal>
      </Fragment>
    );

    /*@@viewOn:example*/
  },
});

//@@viewOn:exports
export { ModalOnButtonWater };
export default ModalOnButtonWater;
//@@viewOff:exports
