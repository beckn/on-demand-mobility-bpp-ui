import Account from "../../Account/Account";

export const AddDriver = (prop) => {
  const dispatchEvent = (e, k) => {
    prop.onChange(e, k);
  };
  return (
    <div className="row w-100">
      <div className="col">
        <div className="row">
          <div className="col">
            <h2>Add/Edit Driver:</h2>
          </div>
          <div className="col text-end">
            <button className="btn btn-secondary btn-sm me-2" onClick={(e) => dispatchEvent(e)}>
              Cancel
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <Account NewUser={true} EditUser={prop?.EditUser} onChange={(e, k) => dispatchEvent(e, k)} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddDriver;
