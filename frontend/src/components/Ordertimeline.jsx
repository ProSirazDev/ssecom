import React from 'react';
import { Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import clsx from 'clsx';

// Custom Connector Line
const ColorConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 6,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#4caf45', // Green for active
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#4caf50', // Green for completed
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#cfd8dc', // Gray for inactive
    borderRadius: 1,
  },
}));

// Custom Step Icon Component
const CustomStepIcon = (props) => {
  const { active, completed, className } = props;

  return (
    <div
      className={clsx(className, 'flex items-center justify-center rounded-full w-3 h-3 text-white', {
        'bg-green-500': completed || active,
        'bg-gray-400': !completed && !active,
      })}
    >
      {completed ? <Check fontSize="small" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
    </div>
  );
};

const Ordertimeline = ({ currentStatus }) => {
  const steps = ['Pending', 'Approved', 'Shipped', 'Delivered'];
  const currentIndex = steps.findIndex(
    step => step.toLowerCase() === currentStatus?.toLowerCase()
  );

  return (
    <Stepper
      activeStep={currentIndex}
      alternativeLabel
      connector={<ColorConnector />}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default Ordertimeline;
