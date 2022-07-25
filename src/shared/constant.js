export const ErrorBlocks = [
  {
    Title: "Even the things we love break sometimes.",
    SubTitle: "Thanks for your patience while we put the pieces back together.",
    ImgUrl: "/assets/errorviews/img4.jpg",
  },
  {
    Title: "This page is lost in space!",
    SubTitle: "What you're looking for may have been misplaced in Long Term Memory.",
    ImgUrl: "/assets/errorviews/img2.jpg",
  },
  {
    Title: "Awww...Don't Cry.",
    SubTitle: "An error has occurred and we're working to fix the problem! We'll be up and running shortly.",
    ImgUrl: "/assets/errorviews/img1.jpg",
  },
  {
    Title: "UH OH!",
    SubTitle: "I ate the page you're looking for",
    ImgUrl: "/assets/errorviews/img5.jpg",
  },
  {
    Title: "oops!",
    SubTitle: "It seems our code may have taken a wrang turn.",
    ImgUrl: "/assets/errorviews/img3.jpg",
  },
];
export const ErrorBlocks404 = [
  {
    Title: "Even the things we love missed sometimes.",
    SubTitle: "Thanks for your patience while we put the pieces back together.",
    ImgUrl: "/assets/errorviews/img4.jpg",
  },
  {
    Title: "This page is lost in space!",
    SubTitle: "What you're looking for may have been misplaced in Long Term Memory.",
    ImgUrl: "/assets/errorviews/img2.jpg",
  },
  {
    Title: "Awww...Don't Cry.",
    SubTitle: "It looks like your've reached a URL that doesn't exist. Please user the below button to back on track",
    ImgUrl: "/assets/errorviews/img1.jpg",
  },
  {
    Title: "UH OH!",
    SubTitle: "I ate the page you're looking for",
    ImgUrl: "/assets/errorviews/img5.jpg",
  },
  {
    Title: "oops!",
    SubTitle: "It seems our code may have taken a wrang turn.",
    ImgUrl: "/assets/errorviews/img3.jpg",
  },
];

export const DriverGrid = {
  ColumnsHead: [
    {
      Name: "Name of Driver",
      Key: "LongName",
    },
    {
      Name: "Licence number",
      Field: { Name: "Document", Value: "Licence", Key: "DocumentNumber" },
      Key: "DriverDocuments",
    },
    {
      Name: "Verification Status",
      Key: "Verified",
    },
    {
      Name: "Location",
      Field: { Key: "Name" },
      Key: "City",
    },
    {
      Name: "Document Status",
      Field: { Name: "Document", Value: "Licence", Key: "Verified" },
      Key: "DriverDocuments",
    },
    {
      Name: "Date of joining",
      Key: "DateOfJoining",
    },
    {
      Name: "Action",
      Key: "",
    },
  ],
  ColumnsData: [],
};
export const VehicleGrid = {
  ColumnsHead: [
    {
      Name: "Name of Model",
      Key: "NameOfModel",
    },
    {
      Name: "Vehicle Number",
      Key: "VehicleNumber",
    },
    {
      Name: "Make",
      Key: "Make",
    },
    {
      Name: "Fuel Type",
      Key: "FuelType",
    },
    {
      Name: "Vehicle Type",
      Key: "VehicleType",
    },
    {
      Name: "Verification Status",
      Key: "Verified",
    },
    {
      Name: "Date of Register",
      Field: { Name: "Document", Value: "RC", Key: "ValidFrom" },
      Key: "VehicleDocuments",
    },
    {
      Name: "Action",
      Key: "",
    },
  ],
  ColumnsData: [],
};

export const verificationKeys = {
  verifyDriver: "verifyDriver",
  editDriver: "editDriver",
  verifyVehicle: "verifyVehicle",
  editVehicle: "editVehicle",
};

export const VehicleTags = ["Make", "NameOfModel", "VehicleType", "FuelType"];
export const VehicleType = ["SUV", "Mini SUV", "SEDAN", "MUV", "MICRO", "SEDAN", "CUV", "HATCHBACK", "MINIVAN", "COUPE"];
export const VehicleFuelType = ["Petrol", "Diesel", "CNG", "Bio-Diesel", "LPG", "Ethanol or Methanol", "Electric"];
