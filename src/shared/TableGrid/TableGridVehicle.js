import { useEffect } from "react";
import { getKeyValueFromString } from "../../core/common.functions";
import { verificationKeys } from "../constant";
import { getKey } from "./TableGrid.utils";

const TableGridVehicle = (props) => {
  console.log("propsVehicle", props);

  return (
    <>
      {props.GridData?.ColumnsData?.filter((x) =>
        props.Status ? x.Approved === props.Status : x
      ).length !== 0 ? (
        <table className="table mt-4">
          <thead>
            <tr>
              {props.GridData?.ColumnsHead?.map((x) => (
                <th key={x.Name}>{x.Name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.GridData?.ColumnsData?.filter((x) =>
              props.Status ? x.Approved === props.Status : x
            ).map((c) => (
              <tr key={c.Id}>
                {props.GridData?.ColumnsHead?.filter(
                  (x) => x.Name !== "Action"
                ).map((v, i) => {
                  let typeString = c.Tags;

                  let type = getKey(c, v);
                  return (
                    <td key={i}>
                      {type ? type : getKeyValueFromString(v.Key, typeString)}
                    </td>
                  );
                })}
                <td>
                  {props.Status === "N" && c.VehicleDocuments && (
                    <button
                      className="btn btn-sm btn-link"
                      name={verificationKeys.verifyVehicle}
                      onClick={(e) => props.onClick(e, c)}
                    >
                      Verify
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-link"
                    name={verificationKeys.editVehicle}
                    onClick={(e) => props.onClick(e, c)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No Data Available"
      )}
    </>
  );
};

export default TableGridVehicle;
