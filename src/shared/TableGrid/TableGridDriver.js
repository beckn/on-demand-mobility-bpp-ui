const TableGridDriver = (props) => {
  return (
    <>
      {props.GridData?.ColumnsData?.filter((x) => (props.Status ? x.Verified === props.Status && x.Staff === "N" : x.Staff === "N")).length !== 0 ? (
        <table className="table table-striped mt-4">
          <tr>
            {props.GridData?.ColumnsHead?.map((x) => (
              <th>{x.Name}</th>
            ))}
          </tr>
          {props.GridData?.ColumnsData?.filter((x) => (props.Status ? x.Verified === props.Status && x.Staff === "N" : x.Staff === "N")).map((c) => (
            <tr>
              {props.GridData?.ColumnsHead?.filter((x) => x.Name !== "Action").map((v, i) => {
                let type = typeof c[v.Key] === "object" ? (v.Field.Name ? c[v.Key].find((x) => x[v.Field.Name] === v.Field.Value)[v.Field.Key] : c[v.Key][v.Field.Key]) : c[v.Key];
                return <td>{type}</td>;
              })}
              <td>
                {props.Status === "N" && (
                  <button className="btn btn-sm btn-link" name="verify" onClick={(e) => props.onClick(e, c)}>
                    Verify
                  </button>
                )}
                <button className="btn btn-sm btn-link" name="edit" onClick={(e) => props.onClick(e, c)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        "No Data Available"
      )}
    </>
  );
};

export default TableGridDriver;
