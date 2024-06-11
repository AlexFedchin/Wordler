import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CustomTextField = ({
  label,
  value,
  onChange,
  mb = '4px',
  type = 'text',
  showPassword = false,
  onToggleShowPassword,
  ...props
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      fullWidth
      margin="dense"
      value={value}
      onChange={onChange}
      type={type}
      InputProps={
        label === 'Password' || label === 'Confirm Password'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onToggleShowPassword}
                    edge="end"
                    sx={{
                      color: showPassword
                        ? 'var(--accent-color)'
                        : 'var(--off-white-color)',
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
      sx={{
        mb: mb,
        // Border styles
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--accent-color)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--darker-accent-color)',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--off-white-color)',
          transition: 'all 0.3s ease',
        },
        // Label styles
        '& .MuiInputLabel-root': {
          color: 'var(--off-white-color)',
          fontFamily: 'TextFont',
          fontSize: 'large',
          transition: 'all 0.3s ease',
        },
        '&:hover .MuiInputLabel-root': {
          color: 'var(--darker-accent-color)',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'var(--accent-color)',
        },
        // Input text color
        '& .MuiInputBase-input': {
          color: 'var(--off-white-color)',
          fontFamily: 'TextFont',
          fontSize: 'large',
        },
        // Autofill background color fix
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px #121212 inset !important',
          '-webkit-text-fill-color': 'var(--off-white-color) !important',
        },
      }}
      {...props}
    />
  );
};

export default CustomTextField;
