// color: red;
// font-size: 0.75rem;
// margin-top: 0.5rem;

export const ErrorMessage = ({ fieldError }) => {
  return (
    <div className="text-sm text-danger">
      {fieldError && fieldError.message}
    </div>
  );
};
