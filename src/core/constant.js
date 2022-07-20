export const AppRoutes = {
  admin: "/login",
  signUp: "/sign-up",
  signInOtp: "/sign-in-phone",
  signInPassword: "/sign-in-password",
  adminDashboard: "/admin-dashboard",
  addVehicle: "/add-vehicles",
};

export const LocalKey = {
  saveApi: "saveApi",
  saveUser: "saveUser",
  spinnerKey: "taxiSpinner",
};

export const NoHeader = ["/", AppRoutes.admin, AppRoutes.signInOtp, AppRoutes.signInPassword, AppRoutes.signUp];

export const DocumentType = {
  Aadhar: "Aadhar",
  Pan: "Pan",
  Licence: "Licence",
};

export const commonMsg = {
  NoValue: "Not Available",
};

export const SearchGroupsCode = { PinCode: "pin_codes", State: "states", City: "cities" };

export const GroupsCode = { PinCode: "PinCodes", State: "States", City: "Cities" };

export const NoLoader = ["user/cities/search", "user/pin_codes/search", "user/states/search"];
