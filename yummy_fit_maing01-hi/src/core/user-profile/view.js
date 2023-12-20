//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";
import { Icon } from "uu5g05-elements";

import Config from "./config/config.js";
import WelcomeRow from "../../bricks/welcome-row.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  icon: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let UserProfile = createVisualComponent({
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
    const { identity } = useSession();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
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
            Věk: 22 <Icon icon="uugds-pencil" colorScheme="primary" tooltip="Edit" /> <br /> Váha: 82kg{" "}
            <Icon icon="uugds-pencil" colorScheme="primary" tooltip="Edit" />
          </Uu5Elements.Text>
        </WelcomeRow>
      </div>
    );
    //@@viewOff:render
  },
});

UserProfile = withRoute(UserProfile, { authenticated: true });

//@@viewOn:exports
export { UserProfile };
export default UserProfile;
//@@viewOff:exports
