//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5 from "uu_plus4u5g02";
import Plus4U5App from "uu_plus4u5g02-app";
import YummyFitProvider from "./yummyfit-provider.js";
import Config from "./config/config.js";
import Home from "../routes/home.js";
import UserProfile from "../routes/user-profile.js";
//@@viewOff:imports

//@@viewOn:constants
const About = Utils.Component.lazy(() => import("../routes/about.js"));
const InitAppWorkspace = Utils.Component.lazy(() => import("../routes/init-app-workspace.js"));
const ControlPanel = Utils.Component.lazy(() => import("../routes/control-panel.js"));

const ROUTE_MAP = {
  "": { redirect: "home" },
  home: (props) => <Home {...props} />,
  userProfile: (props) => <UserProfile {...props} />,
  about: (props) => <About {...props} />,
  "sys/uuAppWorkspace/initUve": (props) => <InitAppWorkspace {...props} />,
  controlPanel: (props) => <ControlPanel {...props} />,
  "*": () => (
    <Uu5Elements.Text category="story" segment="heading" type="h1">
      Not Found
    </Uu5Elements.Text>
  ),
};
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Spa = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Spa",
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
      <div style={{backgroundImage: 'url("https://img.freepik.com/free-photo/beige-soft-gradient-background-vintage-style_53876-108718.jpg?w=1060&t=st=1705495533~exp=1705496133~hmac=6ba78d0ac5581bef33bf09856db0cc1cd9c8cb1271fbd64b7376ab9850c2747a")', backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center",}}>
        <Plus4U5.SpaProvider initialLanguageList={["en", "cs"]}>
          <Uu5Elements.ModalBus>
            <YummyFitProvider>
              <Plus4U5App.Spa routeMap={ROUTE_MAP} />
            </YummyFitProvider>
          </Uu5Elements.ModalBus>
        </Plus4U5.SpaProvider>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Spa };
export default Spa;
//@@viewOff:exports
