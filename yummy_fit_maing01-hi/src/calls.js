import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  YummyFit: {
    load(dtoIn) {
      const commandUri = Calls.getCommandUri("userProfile/get");
      return Calls.call("get", commandUri, dtoIn);
    },
    loadFood(dtoIn) {
      const commandUri = Calls.getCommandUri("appConfig/list");
      return Calls.call("get", commandUri, dtoIn);
    },
    createFood(dtoIn) {
      const commandUri = Calls.getCommandUri("calorieIntake/create");
      return Calls.call("post", commandUri, dtoIn);
    },
    createActivity(dtoIn) {
      const commandUri = Calls.getCommandUri("physicalActivity/create");
      return Calls.call("post", commandUri, dtoIn);
    },
    loadTodaysActivity(dtoIn) {
      const commandUri = Calls.getCommandUri("physicalActivity/list");
      return Calls.call("get", commandUri, dtoIn);
    },
    createTodaysActivity(dtoIn) {
      const commandUri = Calls.getCommandUri("physicalActivity/create");
      return Calls.call("post", commandUri, dtoIn);
    },
    deleteTodaysActivity(dtoIn) {
      const commandUri = Calls.getCommandUri("physicalActivity/delete");
      return Calls.call("post", commandUri, dtoIn);
    },
    loadTodaysFood(dtoIn) {
      const commandUri = Calls.getCommandUri("calorieIntake/list");
      return Calls.call("get", commandUri, dtoIn);
    },
    createTodaysFood(dtoIn) {
      const commandUri = Calls.getCommandUri("calorieIntake/create");
      return Calls.call("post", commandUri, dtoIn);
    },
    deleteTodaysFood(dtoIn) {
      const commandUri = Calls.getCommandUri("calorieIntake/delete");
      return Calls.call("post", commandUri, dtoIn);
    },
    createTodaysWater(dtoIn) {
      const commandUri = Calls.getCommandUri("drinkingRegime/create");
      return Calls.call("post", commandUri, dtoIn);
    },
    createUser(dtoIn) {
      const commandUri = Calls.getCommandUri("userProfile/create");
      return Calls.call("post", commandUri, dtoIn);
    },
    updateUser(dtoIn) {
      const commandUri = Calls.getCommandUri("userProfile/update");
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
