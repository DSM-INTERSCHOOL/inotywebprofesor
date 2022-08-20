import { Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'

interface Props {
    activeStep:number;
}

export const CuestionarioSteps:React.FC<Props> = ({activeStep}) => {
  return (
    <div style={{width:"100%"}}>
        <Stepper activeStep={activeStep}>
            <Step>
                <StepLabel>Detalles cuestionario</StepLabel>
            </Step>
            <Step>
                <StepLabel>Selección destinatarios</StepLabel>
            </Step>
            <Step>
                <StepLabel>Selección de reactivos</StepLabel>
            </Step>
            <Step>
                <StepLabel>Verifica información</StepLabel>
            </Step>
        </Stepper>
    </div>
  )
}
