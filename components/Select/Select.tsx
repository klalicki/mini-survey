const Select = ({
  options,
  title,
  value,
  fieldName,
  handleChange,
}: {
  options: Array<{ labelText: string; value: string }>;
  title: string;
  value?: string;
  fieldName: string;
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
                id={`radio-${item.value}`}
                checked={value === item.value}
                onChange={(e) => {
                  if (handleChange) {
                    handleChange(item.value);
                  }
                }}
              />
              <label htmlFor={`radio-${item.value}`}>{item.labelText}</label>
            </>
          );
        })}{" "}
      </fieldset>
    </>
  );
};

export default Select;
