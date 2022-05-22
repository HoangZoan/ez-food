import { Button, FormControl, Grid, Stack, Typography } from "@mui/material";
import { FormLabel, TextField } from "components/UI/FormComponents";
import React, { useState } from "react";
import { styled } from "shared/theme";
import MenuFormControl from "../MenuFormControl";

const MenuOptionLabel = styled(FormLabel)({
  fontSize: "1.2rem",
  marginBottom: "0.4rem",
  fontWeight: 700,
});

const OptionsField = () => {
  const [newSelectLength, setNewSelectLength] = useState(2);
  const generatedSelectArr = Array.from(new Array(newSelectLength).keys());

  const handleAddSelect = () => {
    setNewSelectLength((oldState) => oldState + 1);
  };

  const handleRemoveSelect = () => {
    setNewSelectLength((oldState) => oldState - 1);
  };

  return (
    <>
      <MenuFormControl>
        <FormLabel>Tên lựa chọn:</FormLabel>
        <TextField />
      </MenuFormControl>
      <MenuFormControl>
        <FormLabel>Các lựa chọn:</FormLabel>
        <Stack spacing={1}>
          {generatedSelectArr.map((key) => (
            <Grid container key={key}>
              <Grid item xs={8}>
                <FormControl>
                  <MenuOptionLabel>Lựa chọn</MenuOptionLabel>
                  <TextField />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <MenuOptionLabel>Tăng thêm</MenuOptionLabel>
                  <TextField
                    defaultValue={0}
                    type="number"
                    placeholder="Nghìn VNĐ"
                  />
                  <Typography variant="subtitle2">(nghìn VNĐ)</Typography>
                </FormControl>
              </Grid>
            </Grid>
          ))}

          <Stack direction="row" justifyContent="space-between">
            <Button
              sx={{ fontSize: "1.2rem", mt: 0 }}
              onClick={handleAddSelect}
            >
              + Thêm lựa chọn
            </Button>
            {newSelectLength > 2 && (
              <Button
                sx={{ fontSize: "1.2rem", mt: 0 }}
                onClick={handleRemoveSelect}
                color="error"
              >
                - Bớt lựa chọn
              </Button>
            )}
          </Stack>
        </Stack>
      </MenuFormControl>
    </>
  );
};

export default OptionsField;
