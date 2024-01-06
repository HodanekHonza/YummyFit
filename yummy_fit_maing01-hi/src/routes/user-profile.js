//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import View from "../core/user-profile/view.js";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <RouteBar />
        <View />
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
