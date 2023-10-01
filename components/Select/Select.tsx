const Select = ({
  options,
  title,
  value,
  fieldName,
  handleChange,
  groupId,
}: {
  options: Array<{ labelText: string; value: string }>;
  title: string;
  value?: string;
  fieldName: string;
  groupId: string;
  handleChange?: Function;
}) => {
  return (
    <>
      <fieldset>
        <legend>{title}</legend>
        {options.map((item, index) => {
          return (
            <>
              <input
                type="radio"
                name={fieldName}
                id={`radio-${fieldName}-${item.value}`}
                checked={value === item.value}
                onChange={(e) => {
                  if (handleChange) {
                    handleChange(item.value);
                  }
                }}
              />
              <label htmlFor={`radio-${fieldName}-${item.value}`}>
                {item.labelText}
              </label>
            </>
          );
        })}{" "}
      </fieldset>
    </>
  );
};

export default Select;
