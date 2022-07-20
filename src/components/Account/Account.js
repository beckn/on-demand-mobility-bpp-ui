/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Autocomplete from "react-autocomplete";
// import PropTypes from "prop-types";
import classNames from "classnames";
import isEmpty from "lodash/isEmpty";
import "react-dates/initialize";
import { Upload } from "react-feather";
import { userSave } from "../../core/apiClient.js";
import { getAddress, setValue } from "../../core/common.functions.js";
import { DocumentType, GroupsCode, LocalKey, SearchGroupsCode } from "../../core/constant.js";
import { getCookie } from "../../core/CookiesHandler.js";
import { getAutoCompleteValues, uploadFile } from "./Account.Services.js";
import { UserFields } from "../../core/fieldsSet.js";

export const Account = (prop) => {
  const [NewUser, setNewUser] = useState(prop?.EditUser ? prop?.EditUser : "");
  const User = prop.User ? JSON.parse(getCookie(LocalKey.saveUser)) : NewUser || null;
  const IsStore = User && !prop.NewUser && !prop.EditUser ? true : false;
  const [isUserEdit, setIsUserEdit] = useState(IsStore);
  const [isAddressEdit, setIsAddressEdit] = useState(User && isEmpty(getAddress(User)) ? false : IsStore);
  const [userAddress, setUserAddress] = useState({
    AddressLine1: User?.AddressLine1 || "",
    AddressLine2: User?.AddressLine2 || "",
    AddressLine3: User?.AddressLine3 || "",
    City: {
      Name: User?.City?.Name || "",
      State: {
        Name: User?.City?.State.Name || "",
        Country: {
          Name: "India",
        },
      },
    },
    PinCode: {
      PinCode: User?.PinCode?.PinCode || "",
    },
    otherFields: {
      autocompleteCityData: [],
      autocompleteStateData: [],
      autocompletePinCodeData: [],
    },
  });
  const [userInfo, setUserInfo] = useState({
    DateOfBirth: User?.DateOfBirth || null,
    Name: User?.Name,
    FirstName: User?.FirstName,
    LastName: User?.LastName,
    PhoneNumber: User?.PhoneNumber,
    Company: JSON.parse(getCookie(LocalKey.saveUser)).Company,
  });
  const [documentInfo, setDocumentInfo] = useState([]);
  const [PanNumber, setPanNumber] = useState("");
  const [LicenseNumber, setLicenseNumber] = useState("");
  const [eKycPassword, setEKycPassword] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const years = (startYear) => {
    var currentYear = new Date().getFullYear(),
      years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  };

  const setUserValue = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let upValue = name === "PhoneNumber" ? value : value;
    setUserInfo({
      ...userInfo,
      [name]: upValue,
    });
  };

  const init = () => {
    document.title = `taxi BPP Sing up`;
    if (User && User?.DriverDocuments) {
      let LicenceNo = User?.DriverDocuments?.find((x) => x.Document === "Licence")?.DocumentNumber;
      setLicenseNumber(LicenceNo);
    }
  };

  const getUpload = (e, type) => {
    let file = e.target.files[0];
    let formData = new FormData();
    let number = type === DocumentType.Licence ? LicenseNumber : PanNumber;
    let userId = prop.NewUser ? NewUser.Id : User.Id;

    if (type === DocumentType.Licence) {
      formData.append("ADDRESS_LINE_1", userAddress.AddressLine1);
      formData.append("ADDRESS_LINE_2", userAddress.AddressLine2);
      formData.append("ADDRESS_LINE_3", userAddress.AddressLine3);
      formData.append("EMAIL", User.Name);
      formData.append("PHONE_NUMBER", User.PhoneNumber);
      formData.append("DATE_OF_BIRTH", User.DateOfBirth || userInfo.DateOfBirth);
    }

    formData.append("DOCUMENT", type);
    formData.append("FILE", file);
    formData.append("DRIVER_ID", userId);
    formData.append("DOCUMENT_NUMBER", number);
    type === DocumentType.Aadhar && formData.append("PASSWORD", eKycPassword);

    uploadFile("driver_documents/save", formData, "", prop.NewUser ? false : true).then((res) => {
      console.log(`uploadData`, res.data.DriverDocument);
      if (prop.NewUser) {
        setNewUser({
          ...NewUser,
          DriverDocuments: [...NewUser?.DriverDocuments, res.data.DriverDocument],
        });
      }
    });
  };

  const getSelect = (e) => {
    e.preventDefault();
    let type = {
      AadharFile: "AADHAR",
      PanFile: "PAN",
      LicenseFile: "LICENSE",
    };
    let fieldMap = {
      AadharFile: eKycPassword,
      PanFile: PanNumber,
      LicenseFile: LicenseNumber,
    };
    let file = e.target.files[0];
    let name = e.target.name;
    let copy = documentInfo;
    copy.push({
      [name]: file,
      type: type[name],
      DocumentNumber: fieldMap[name],
    });
    setDocumentInfo(copy);
  };

  const enableEdit = (e, func, state) => {
    e.preventDefault();
    func(state);
  };

  const addressValueChange = (e) => {
    let { name, value } = e.target;
    let copy = Object.assign({}, userAddress);
    setValue(name, value, copy);
    setUserAddress(copy);
  };

  const retrieveData = (searchField, type) => {
    var searchText = searchField.value;
    getAutoCompleteValues(SearchGroupsCode[type], searchText).then((response) => {
      if (searchField.value === searchText) {
        setUserAddress({
          ...userAddress,
          otherFields: {
            ...userAddress.otherFields,
            [`autocomplete${type}Data`]: response.data[GroupsCode[type]],
          },
        });
      }
    });
  };

  const onAutoChange = (e, type) => {
    let copy = Object.assign({}, userAddress);
    setValue(e.target.name, e.target.value, copy);
    // console.log("onAutoChange", userAddress, copy, e.target.name, e.target.value);
    if (type === "PinCode") {
      setValue("City.Name", "", copy);
      setValue("City.State.Name", "", copy);
    }
    if (type === "City") {
      setValue("City.State.Name", "", copy);
    }

    setUserAddress(copy);

    retrieveData(e.target, type);
  };

  const onSelect = (val, name, key) => {
    let copy = Object.assign({}, userAddress);

    setValue(name, val, copy);
    let newState = {
      ...copy,
      otherFields: {
        ...copy.otherFields,
        [`autocomplete${key}Data`]: [],
      },
    };

    if (key === "PinCode") {
      let getData = copy.otherFields[`autocomplete${key}Data`].find((x) => x.PinCode === val);
      let getCity = getData.City.Name;
      let getState = getData.State.Name;
      setValue("City.Name", getCity, copy);
      setValue("City.State.Name", getState, copy);
    }

    if (key === "City") {
      let getData = copy.otherFields[`autocomplete${key}Data`].find((x) => x.Name === val);
      let getState = getData.State.Name;
      setValue("City.State.Name", getState, copy);
    }

    setUserAddress(newState);

    // console.log("Option from 'database' selected : ", val, name, key, newState);
  };

  const renderItem = (item, isHighlighted, styles, code) => {
    return (
      <div id={item[code]} className={classNames({ active: isHighlighted, "autocomplete-item": true })}>
        {item[code]}
      </div>
    );
  };

  const getItemValue = (item, code) => {
    return `${item[code]}`;
  };

  const userAddressUpdate = (e) => {
    e.preventDefault();
    // window.location.href = AppRoutes.adminDashboard;
    let address = Object.assign({}, userAddress);
    delete address.otherFields;
    let UserSave = "users/save";
    let userData = {
      User: {
        Id: prop.NewUser ? NewUser.Id : User.Id,
        Name: prop.NewUser ? NewUser.Name : User.Name,
        ...address,
      },
    };
    userSave(UserSave, userData, "", IsStore).then((res) => {
      console.log("Address Save");
      if (prop.NewUser) {
        setNewUser(res.data.Users[0]);
        enableEdit(e, setIsAddressEdit, true);
      } else {
        enableEdit(e, setIsAddressEdit, true);
      }
    });
  };

  const userUpdate = (e) => {
    e.preventDefault();
    let user = Object.assign({}, userInfo);
    user.LongName = userInfo.FirstName.concat(" ", userInfo.LastName);
    delete user.FirstName;
    delete user.LastName;
    let UserSave = "users/save";
    let userData = {
      Users: [
        {
          ...user,
        },
      ],
    };
    userSave(UserSave, userData, UserFields, IsStore).then((res) => {
      console.log("User data Save");
      if (prop.NewUser) {
        setNewUser(res.data.Users[0]);
        enableEdit(e, setIsUserEdit, true);
      } else {
        enableEdit(e, setIsUserEdit, true);
      }
    });
  };

  return (
    <section>
      <div className={classNames({ "vh-100": true, "container-fluid": User })}>
        <form onSubmit={(e) => {}}>
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Personal Information:</h4>
            </div>
            <div className="col text-end">
              {isUserEdit ? (
                <button className="btn btn-primary btn-sm" onClick={(e) => enableEdit(e, setIsUserEdit, false)}>
                  Edit
                </button>
              ) : (
                <>
                  <button className="btn btn-secondary btn-sm me-2" onClick={(e) => enableEdit(e, setIsUserEdit, true)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={(e) => userUpdate(e)}>
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
          <hr className="mt-2 mb-3" />
          <div className="row w-100 justify-content-left">
            <div className="col-6 mb-3">
              <input type="text" name="FirstName" id="FirstName" disabled={isUserEdit} defaultValue={userInfo.FirstName} onChange={(e) => setUserValue(e)} className="form-control" placeholder="First Name" />
            </div>
            <div className="col-6  mb-3">
              <input type="text" name="LastName" id="LastName" disabled={isUserEdit} defaultValue={userInfo.LastName} onChange={(e) => setUserValue(e)} className="form-control" placeholder="Last Name" />
            </div>
          </div>
          <div className="row w-100 justify-content-left">
            <div className="col-4 mb-3">
              <input type="text" name="PhoneNumber" id="PhoneNumber" disabled={isUserEdit} defaultValue={userInfo.PhoneNumber} onChange={(e) => setUserValue(e)} className="form-control" placeholder="Mobile Number" />
            </div>
            <div className="col-4  mb-3">
              <input type="text" name="Name" id="Name" disabled={isUserEdit} defaultValue={userInfo.Name} onChange={(e) => setUserValue(e)} className="form-control" placeholder="Email" />
            </div>
            <div className="col-4  mb-3">
              <input type="date" name="DateOfBirth" id="DateOfBirth" disabled={isUserEdit} defaultValue={userInfo.DateOfBirth} onChange={(e) => setUserValue(e)} className="form-control" placeholder="Date Of Birth (DD/MM/YYYY)" />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <h4>Address Information:</h4>
            </div>
            <div className="col text-end">
              {isAddressEdit ? (
                <button className="btn btn-primary btn-sm" onClick={(e) => enableEdit(e, setIsAddressEdit, false)}>
                  Edit
                </button>
              ) : (
                <>
                  <button className="btn btn-secondary btn-sm me-2" onClick={(e) => enableEdit(e, setIsAddressEdit, true)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={(e) => userAddressUpdate(e)}>
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
          <hr className="mt-2 mb-3" />
          <div className="row w-100 justify-content-left">
            <div className="col-4 mb-3">
              <input type="text" name="AddressLine1" id="AddressLine1" disabled={isAddressEdit} defaultValue={userAddress.AddressLine1} onChange={(e) => addressValueChange(e)} className="form-control" placeholder="Apartment, unit, suite, or floor #" />
            </div>
            <div className="col-4  mb-3">
              <input type="text" name="AddressLine2" id="AddressLine2" disabled={isAddressEdit} defaultValue={userAddress.AddressLine2} onChange={(e) => addressValueChange(e)} className="form-control" placeholder="Locality, Area" />
            </div>
            <div className="col-4  mb-3">
              <input type="text" name="AddressLine3" id="AddressLine3" disabled={isAddressEdit} defaultValue={userAddress.AddressLine3} onChange={(e) => addressValueChange(e)} className="form-control" placeholder="Land Mark (if any)" />
            </div>
          </div>
          <div className="row w-100 justify-content-left">
            <div className="col-4 mb-3">
              <Autocomplete
                className="btn btn-primary"
                getItemValue={(e) => getItemValue(e, "PinCode")}
                items={userAddress.otherFields.autocompletePinCodeData}
                renderItem={(item, props, styles) => renderItem(item, props, styles, "PinCode")}
                value={userAddress.PinCode.PinCode}
                onChange={(e) => onAutoChange(e, "PinCode")}
                onSelect={(e) => onSelect(e, "PinCode.PinCode", "PinCode")}
                wrapperProps={{ class: "autocomplete-box" }}
                inputProps={{ type: "tel", class: `form-control`, name: "PinCode.PinCode", id: "PinCode", disabled: isAddressEdit, placeholder: "Enter pin code*" }}
              />
            </div>
            <div className="col-4  mb-3">
              {User?.DriverDocument}
              <Autocomplete
                className="btn btn-primary"
                getItemValue={(e) => getItemValue(e, "Name")}
                items={userAddress.otherFields.autocompleteCityData}
                renderItem={(item, props, styles) => renderItem(item, props, styles, "Name")}
                value={userAddress.City.Name}
                onChange={(e) => onAutoChange(e, "City")}
                onSelect={(e) => onSelect(e, "City.Name", "City")}
                wrapperProps={{ class: "autocomplete-box" }}
                inputProps={{ class: `form-control`, disabled: (!userAddress.City.Name && !userAddress.PinCode.PinCode) || isAddressEdit, name: "City.Name", id: "City", placeholder: "Enter city name*" }}
              />
            </div>
            <div className="col-4  mb-3">
              <Autocomplete
                className="btn btn-primary"
                getItemValue={(e) => getItemValue(e, "Name")}
                items={userAddress.otherFields.autocompleteStateData}
                renderItem={(item, props, styles) => renderItem(item, props, styles, "Name")}
                value={userAddress.City.State.Name}
                onChange={(e) => onAutoChange(e, "State")}
                onSelect={(e) => onSelect(e, "City.State.Name", "State")}
                wrapperProps={{ class: "autocomplete-box" }}
                inputProps={{ class: `form-control`, disabled: (!userAddress.City.State.Name && !userAddress.PinCode.PinCode) || isAddressEdit, name: "City.State.Name", id: "State", placeholder: "Enter state name*" }}
              />
            </div>
          </div>
          <>
            <div className="row">
              <div className="col">
                <h4 className="mt-3 mb-0">Personal Documents:</h4>
              </div>
            </div>
            <hr className="my-4" />
            <div className="row w-100 justify-content-left">
              <div className="col-3 mb-3">
                <input type="text" name="LicenseNumber" id="LicenseNumber" defaultValue={LicenseNumber} disabled={User?.DriverDocuments?.find((x) => x.Document === DocumentType.Licence)} onChange={(e) => setLicenseNumber(e.target.value)} className="form-control" placeholder="Enter License Number" />
                <p className="mb-0">{User?.DriverDocuments?.find((x) => x.Document === DocumentType.Licence).Verified === "N" ? "Verification Pending" : User?.DriverDocuments && "Verified"}</p>
              </div>
              {!User?.DriverDocuments?.find((x) => x.Document === "Licence") && (
                <div className="col-1  mb-3">
                  <input type="file" name="LicenseFile" id="LicenseFile" className="form-control d-none" onChange={(e) => getUpload(e, DocumentType.Licence)} />
                  <label htmlFor="LicenseFile" role={"button"}>
                    <Upload />
                  </label>
                </div>
              )}
              <div className="col-3  mb-3">
                {!User?.DriverDocuments?.find((x) => x.Document === DocumentType.Aadhar) ? (
                  <input type="password" name="eKycPassword" id="eKycPassword" value={eKycPassword} onChange={(e) => setEKycPassword(e.target.value)} className="form-control" placeholder="E-Kyc Aadhar File Password" />
                ) : (
                  <>
                    <input type="text" name="eKycPassword" id="eKycPassword" disabled={User?.DriverDocuments?.find((x) => x.Document === DocumentType.Aadhar)} value={User?.DriverDocuments?.find((x) => x.Document === DocumentType.Aadhar).Document} onChange={(e) => setEKycPassword(e.target.value)} className="form-control" placeholder="E-Kyc Aadhar File Password" />
                    <p className="mb-0">{User?.DriverDocuments.find((x) => x.Document === DocumentType.Aadhar).Verified === "N" ? "Verification Pending" : "Verified"}</p>
                  </>
                )}
              </div>
              {!User?.DriverDocuments?.find((x) => x.Document === DocumentType.Aadhar) && (
                <div className="col-1 mb-3">
                  <input type="file" name="AadharFile" id="AadharFile" onChange={(e) => getUpload(e, DocumentType.Aadhar)} className="form-control d-none" />
                  <label htmlFor="AadharFile" role={"button"}>
                    <Upload />
                  </label>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col text-end">
                <button className="btn btn-primary" onClick={(e) => prop.onChange(e, false)}>
                  Update
                </button>
              </div>
            </div>
          </>
        </form>
      </div>
    </section>
  );
};

export default Account;
