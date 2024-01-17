import { Fragment, createVisualComponent, useState, createComponent, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config";
const ChooseWeightHeightForm = createVisualComponent({
  render({ create, ...props }) {
    /*@@viewOn:example*/

    return (
      <div>
        {/*@@viewOn:example*/}
        <Uu5Forms.Form
          onSubmit={(e) => {
            create(e.data.value.weight, e.data.value.height);
          }}
        >
          <Uu5Elements.Block
            header="Select weight and height"
            headerType="heading"
            footer={
              <Uu5Elements.Grid
                templateColumns={{ xs: "1fr", s: "auto" }}
                columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
                justifyContent={{ s: "end" }}
              >
                <Uu5Forms.SubmitButton>Set</Uu5Forms.SubmitButton>
              </Uu5Elements.Grid>
            }
          >
            <div
              className={Config.Css.css({
                display: "grid",
                rowGap: 8,
                gridTemplateRows: "auto",
                marginBottom: 8,
              })}
            >
              <Uu5Forms.FormNumber name="height" label="Height (cm)" value={2} required />
              <Uu5Forms.FormNumber name="weight" label="Weight (kg)" required />
            </div>
          </Uu5Elements.Block>
        </Uu5Forms.Form>
        {/*@@viewOff:example*/}
      </div>
    );

    /*@@viewOn:example*/
  },
});

//@@viewOn:exports
export { ChooseWeightHeightForm };
export default ChooseWeightHeightForm;
//@@viewOff:exports
