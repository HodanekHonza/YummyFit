import { createVisualComponent, useState } from "uu5g05";
import { UuDate } from "uu_i18ng01";
import Uu5Elements from "uu5g05-elements";

function withControlledInput(Calendar) {
  return (props) => {
    const { value: propsValue, onSelect } = props;
    const [value, setValue] = useState(propsValue);

    return (
      <div>
        <Calendar
          {...props}
          value={value}
          onSelect={(e) => {
            typeof onSelect === "function" && onSelect(e);
            setValue(e.data.value);
          }}
        />
      </div>
    );
  };
}

const Calendar = withControlledInput(Uu5Elements.Calendar);

const DisplayDate = createVisualComponent({
  render() {
    const selectedRangeDate = [new UuDate().toIsoString(), new UuDate().shiftDay(9).toIsoString()];

    return (
      <div>
        <Calendar
          value={selectedRangeDate[0]}
          selectionMode="single"
          onSelect={({ data }) => console.log(data.value)}
        />
      </div>
    );
  },
});

export default DisplayDate;
