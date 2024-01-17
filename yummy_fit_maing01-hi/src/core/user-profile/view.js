//@@viewOn:imports
import { createVisualComponent, useSession, Lsi, useEffect, useState, useCallback } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { useAlertBus } from "uu5g05-elements";
import { useYummyFit } from "../yummyfit-context.js";
import ModalOnButtonSelectStats from "../main-page/modal-button-select-stats.js";
import ChooseWeightHeightForm from "../main-page/choose-weight-height-form.js";
import Config from "./config/config.js";
import WelcomeRow from "../../bricks/welcome-row.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
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
  uu5Tag: Config.TAG + "UserProfile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    const { yummyFitDataList } = useYummyFit();
    const [userLoggedIn, setUserLoggedIn] = useState(true);
    const { identity } = useSession();

    const { addAlert } = useAlertBus();
    const showError = useCallback(
      async (error, header = "") => {
        addAlert({
          header,
          message: error.message,
          priority: "error",
        });
      },
      [addAlert],
    );

    const createUser = useCallback(
      async (weight, height) => {
        try {
          yummyFitDataList.handlerMap.create({ weight: weight, height: height });
          addAlert({
            message: `Weight and height has been set`,
            priority: "success",
            durationMs: 2000,
          });
        } catch (error) {
          View.logger.error("Error creating activity", error);
          showError(error, "Activity create failed!");
        }
      },
      [yummyFitDataList.handlerMap, addAlert, showError],
    );

    const updateUser = useCallback(
      async (weight, height) => {
        try {
          yummyFitDataList.handlerMap.update({ weight: weight, height: height });
          addAlert({
            message: `Weight and height has been set`,
            priority: "success",
            durationMs: 2000,
          });
        } catch (error) {
          View.logger.error("Error updating user", error);
          showError(error, "User update failed!");
        }
      },
      [yummyFitDataList.handlerMap, addAlert, showError],
    );
    //@@viewOff:private

    useEffect(() => {
      async function getUser() {
        if (yummyFitDataList?.data?.list?.uuIdentity !== identity.uuIdentity) {
          setUserLoggedIn(false);
          console.log("failed checking user");
        } else {
          setUserLoggedIn(true);
        }
      }
      getUser();
    }, [yummyFitDataList?.data?.list?.uuIdentity, identity.uuIdentity]);
    console.log(yummyFitDataList);
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        {userLoggedIn ? (
          <div className={Css.main()}>
            {" "}
            <WelcomeRow>
              <Uu5Elements.Text category="story" segment="heading" type="h2">
                <Lsi import={importLsi} path={["Home", "welcome"]} />
              </Uu5Elements.Text>
              {identity && (
                <Uu5Elements.Text category="story" segment="heading" type="h2">
                  {identity.name}
                </Uu5Elements.Text>
              )}
              <Uu5Elements.Text category="story" segment="heading" type="h4">
                <br />
                <strong> Using YummyFit: </strong> {yummyFitDataList?.data?.list?.personalAchievementsDaysCount} Days
              </Uu5Elements.Text>
              <br />
              <Uu5Elements.Text category="story" segment="heading" type="h4">
                <strong> Výška: </strong> {yummyFitDataList?.data?.list?.height} cm <br /> <strong> Váha:</strong>{" "}
                {yummyFitDataList?.data?.list?.weight} kg{" "}
              </Uu5Elements.Text>
              <br />
              <ModalOnButtonSelectStats
                header="Change weight and height"
                colorScheme="primary"
                size="l"
                content={<ChooseWeightHeightForm create={updateUser} />}
              />
              <br />
            </WelcomeRow>{" "}
          </div>
        ) : (
          <ChooseWeightHeightForm create={createUser} />
        )}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View as UserProfile };
export default View;
//@@viewOff:exports
