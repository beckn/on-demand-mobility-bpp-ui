import Account from "../../Account/Account";

export const AddDriver = (prop) => {
  const dispatchEvent = (e, k) => {
    prop.onChange(e, k);
  };
  return (
    <div className="row w-100">
      <div className="col">
        <h2>Add New Driver:</h2>
        <hr />
        <Account NewUser={true} onChange={(e, k) => dispatchEvent(e, k)} />
        {/* <button className="btn btn-secondary" onClick={(e) => prop.onChange(e, false)}>
          cancel
        </button> */}
      </div>
    </div>
  );
};
export default AddDriver;
