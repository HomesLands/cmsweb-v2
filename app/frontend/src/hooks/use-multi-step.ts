import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useMultiStep = (initialStep: number) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const step = parseInt(searchParams.get('step') || initialStep.toString(), 10)
  const [currentStep, setCurrentStep] = useState<number>(step)

  useEffect(() => {
    setSearchParams({ step: currentStep.toString() })

  }, [currentStep, setSearchParams])

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
    console.log('Current step:', currentStep)
  }

  return { currentStep, handleStepChange }
}
