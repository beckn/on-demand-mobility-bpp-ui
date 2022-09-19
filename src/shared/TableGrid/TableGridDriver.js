import { verificationKeys } from "../constant";
import React, { useMemo } from "react";
import { getFilteredData, getKey } from "./TableGrid.utils";

const TableGridDriver = (props) => {
  const { ColumnsData: passedColumnsData } = props.GridData;

  const ColumnsData = useMemo(
    () =>
      getFilteredData(passedColumnsData, props.tableType, props.Status) || [],
    [passedColumnsData]
  );

  return (
    <>
      {ColumnsData.length !== 0 ? (
        <table className="table mt-4">
          <thead>
            <tr>
              {props.GridData?.ColumnsHead?.map((x) => (
                <th key={x.Name}>{x.Name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ColumnsData.map((c) => (
              <tr key={c.Id}>
                {props.GridData?.ColumnsHead?.filter(
                  (x) => x.Name !== "Action"
                ).map((v, i) => {
                  let type = getKey(c, v);
                  return <td key={i}>{type}</td>;
                })}
                <td>
                  {props.Status === "N" && c.VehicleDocuments && (
                    <button
                      className="btn btn-sm btn-link"
                      name={verificationKeys.verifyDriver}
                      onClick={(e) => props.onClick(e, c)}
                    >
                      Verify
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-link"
                    name={verificationKeys.editDriver}
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

export default TableGridDriver;
