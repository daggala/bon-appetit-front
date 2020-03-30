import MenuItem from "@material-ui/core/MenuItem";

const createOptions = () => {
  const options = [];
  options.push(
    <MenuItem key={0} value="" disabled>
      Please choose
    </MenuItem>
  );
  for (var i = 1; i < 40; i++) {
    options.push(
      <MenuItem key={i} value={i}>
        {`${i}`}
      </MenuItem>
    );
  }

  return options;
};

export default createOptions;
