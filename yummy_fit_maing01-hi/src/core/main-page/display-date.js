import { createVisualComponent, useState } from "uu5g05";
import { UuDate } from "uu_i18ng01";
import Uu5Elements from "uu5g05-elements";
import { useYummyFit } from "../yummyfit-context.js";
function withControlledInput(Calendar) {
  return (props) => {
    const { value: propsValue, onSelect } = props;

    // Initialize value with propsValue, or today's date if propsValue is undefined
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight
    const initialValue = propsValue ? new Date(propsValue) : today;
    const [value, setValue] = useState(initialValue);

    const { setSelectedDate } = useYummyFit();

    return (
      <div>
        <Calendar
          {...props}
          value={new Date(value)}
          onSelect={(e) => {
            typeof onSelect === "function" && onSelect(e);

            // Create a new Date object from the selected date
            const selectedDate = new Date(e.data.value);

            // Reset the hours, minutes, seconds, and milliseconds to zero
            selectedDate.setHours(0, 0, 0, 0);

            setValue(selectedDate);
            setSelectedDate(selectedDate);
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
        <Calendar value={selectedRangeDate[0]} selectionMode="single" />
      </div>
    );
  },
});

export default DisplayDate;
