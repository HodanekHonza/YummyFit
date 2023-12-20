import { Fragment, createVisualComponent, useState } from "uu5g05";
import { Button, Modal } from "uu5g05-elements";


const ModalOnButton = createVisualComponent({
  render({ header, ...props }) {
    /*@@viewOn:example*/
    const [open, setOpen] = useState();
    return (
      <Fragment>
        <Button size={props.size} colorScheme={props.colorScheme} onClick={() => setOpen(true)}>{header}</Button>
        <Modal {...props} header={header} open={open} onClose={() => setOpen(false)}>
          {props.children}
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