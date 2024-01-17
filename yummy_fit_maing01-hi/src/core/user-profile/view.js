//@@viewOn:imports
import { createVisualComponent, useSession, Lsi, useEffect, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { Icon } from "uu5g05-elements";
import { useYummyFit } from "../yummyfit-context.js";
import Config from "./config/config.js";
import WelcomeRow from "../../bricks/welcome-row.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
// const Css = {
//   icon: () =>
//     Config.Css.css({
//       fontSize: 48,
//       lineHeight: "1em",
//     }),
// };
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
    //@@viewOff:private
    //const userData = yummyFitDataList.data?.list || undefined;
    // console.log(yummyFitDataList.data.list.uuIdentity);
    // console.log(identity.uuIdentity)

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
    }, []);

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        {userLoggedIn ? (
          <>
            {" "}
            <WelcomeRow left={<Plus4U5Elements.PersonPhoto size="xl" borderRadius="none" />}>
              <Uu5Elements.Text category="story" segment="heading" type="h2">
                <Lsi import={importLsi} path={["Home", "welcome"]} />
              </Uu5Elements.Text>
              {identity && (
                <Uu5Elements.Text category="story" segment="heading" type="h2">
                  {identity.name}
                </Uu5Elements.Text>
              )}
              <br />
              <Uu5Elements.Text category="story" segment="heading" type="h4">
                Výška: {yummyFitDataList.data?.list.height} cm{" "}
                <Icon icon="uugds-pencil" colorScheme="primary" tooltip="Edit" /> <br /> Váha:{" "}
                {yummyFitDataList.data?.list.weight} kg{" "}
                <Icon icon="uugds-pencil" colorScheme="primary" tooltip="Edit" />
              </Uu5Elements.Text>
              <Uu5Elements.Text category="story" segment="heading" type="h4">
                Using YummyFit: {yummyFitDataList.data?.list.personalAchievementsDaysCount} Days
              </Uu5Elements.Text>
            </WelcomeRow>{" "}
          </>
        ) : (
          "hello"
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
