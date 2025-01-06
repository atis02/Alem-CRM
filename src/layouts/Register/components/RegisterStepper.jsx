import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Register from "../Register";
import { useState } from "react";
import DocumentStepper from "./DocumentStepper";
import StandartsForNewUser from "./StandartsForNewUser";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterStepper({ openModal }) {
  const [files, setFiles] = useState(null);
  const [docName, setDocName] = useState("Passport");
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const updateFiles = (e) => {
    const file = e.target.files[0];
    file && toast.success("Faýl saýlandy");
    setFiles(file);
    setDocName(file.name);
  };
  const steps = [
    {
      label: "Esasy Maglumatlar",
      component: (
        <Box sx={{ width: "100%", height: "100%" }}>
          <Register
            handleNext={handleNext}
            handleBack={handleBack}
            openModal={openModal}
          />
        </Box>
      ),
    },
    {
      label: "Ulanyjy Resminamasy",
      component: (
        <Box sx={{ width: "100%", height: "100%" }}>
          <DocumentStepper
            handleNext={handleNext}
            handleBack={handleBack}
            openModal={openModal}
            updateFiles={updateFiles}
            files={files}
          />
        </Box>
      ),
    },
    {
      label: "Tertip-düzgün barada",
      component: (
        <Box sx={{ width: "100%", height: "100%" }}>
          <StandartsForNewUser
            handleNext={handleNext}
            handleBack={handleBack}
            openModal={openModal}
            docFile={files}
            docName={docName}
          />
        </Box>
      ),
    },
  ];
  return (
    <Box sx={{ width: "97%", height: "100%", pt: 1 }}>
      <Typography
        mb="10px"
        color="#474747"
        fontSize="25px"
        fontFamily="Montserrat"
        fontWeight="600"
        textAlign="center"
        ml={3}
      >
        Hasaba alyş
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton onClick={handleStep(index)}>{label.label}</StepButton>
            {activeStep === index && label.component}
            {/* <StepContent
              sx={{
                ...(activeStep == index
                  ? {
                      width: "900px",
                    }
                  : ""),
              }}
            >
              {label.component}
            </StepContent> */}
            {/* <StepContent width="100%">
            <Register />
          </StepContent>
          <StepContent width="100%">
            <Register />
          </StepContent> */}
          </Step>
        ))}
      </Stepper>
      {/* <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div> */}
    </Box>
  );
}
