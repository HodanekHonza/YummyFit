//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import { Button } from "uu5g05-elements";
import CalorieChart from "./calorie-chart.js";
import Config from "./config/config.js";
import ModalOnButton from "./modal-button.js";
import DisplayDate from "./display-date.js";

//@@viewOff:imports

//@@viewOn:constants
// TODO work 1h 45min
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "20px",
      gap: "10px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <div className={Css.main()}>
          {" "}
          <ModalOnButton header="Choose date" colorScheme="primary" size="l" children={<DisplayDate />} />
        </div>
        <div className={Css.main()}>
          <ModalOnButton
            header="Add meal"
            children={"Add meal form"}
            size="xl"
            footer={
              <Uu5Elements.Grid
                templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
                columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
                justifyContent={{ s: "end" }}
              >
                <Uu5Forms.CancelButton />
                <Uu5Forms.SubmitButton icon="uugds-check">Confirm</Uu5Forms.SubmitButton>
              </Uu5Elements.Grid>
            }
          />
          <ModalOnButton
            header="Add activity"
            children={"Add activity form"}
            size="xl"
            footer={
              <Uu5Elements.Grid
                templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
                columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
                justifyContent={{ s: "end" }}
              >
                <Uu5Forms.CancelButton />
                <Uu5Forms.SubmitButton icon="uugds-check">Confirm</Uu5Forms.SubmitButton>
              </Uu5Elements.Grid>
            }
          />
          <ModalOnButton
            header="Add water"
            children={"Add water form"}
            size="xl"
            footer={
              <Uu5Elements.Grid
                templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
                columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
                justifyContent={{ s: "end" }}
              >
                <Uu5Forms.CancelButton />
                <Uu5Forms.SubmitButton icon="uugds-check">Confirm</Uu5Forms.SubmitButton>
              </Uu5Elements.Grid>
            }
          />
        </div>
        <CalorieChart />
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
