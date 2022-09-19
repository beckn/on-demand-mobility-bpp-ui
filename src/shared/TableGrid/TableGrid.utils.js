export const getFilteredData = (data = [], tableType, Status) => {
  let filteredData = [];
  if (tableType === "agent") {
    filteredData = data.filter((x) =>
      Status ? x.Approved === Status && x.Staff === "Y" : x.Staff === "Y"
    );
    return filteredData;
  }
  if (tableType === "driver") {
    filteredData = data.filter((x) =>
      Status ? x.Approved === Status && x.Staff === "N" : x.Staff === "N"
    );
    return filteredData;
  }

  return filteredData;
};

export const getKey = (c, { Key, Field, Name }) => {
  const type =
    typeof c[Key] === "object"
      ? Field.Name
        ? c?.[Key].find((x) => x?.[Field.Name] === Field.Value)?.[Field.Key] ||
          ""
        : c?.[Key]?.[Field.Key] || ""
      : c?.[Key] || "";

  return type;
};
