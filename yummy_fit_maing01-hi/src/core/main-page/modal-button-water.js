import { Fragment, createVisualComponent, useState } from "uu5g05";
import { Button, Input, Modal } from "uu5g05-elements";

const ModalOnButtonWater = createVisualComponent({
  render({ header, content, create, ...props }) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (create && typeof create === "function") {
        create(inputValue);
      }
      setOpen(false); // Optionally close the modal after submission
    };

    return (
      <Fragment>
        <Button significance={props.significance} size={props.size} colorScheme={props.colorScheme} onClick={() => setOpen(true)}>
          {header}
        </Button>
        <Modal header={header} open={open} onClose={() => setOpen(false)}>
          <form onSubmit={handleSubmit}>
            <Input value={inputValue} onChange={handleInputChange} />
            <Button type="submit">Submit</Button>
          </form>
        </Modal>
      </Fragment>
    );
  },
});

export { ModalOnButtonWater };
export default ModalOnButtonWater;
