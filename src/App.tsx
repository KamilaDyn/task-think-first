import { FormProvider } from './context/FormProvider'
import { FormComponent } from './module'

function App() {
  return (
    <FormProvider>
      <FormComponent />
    </FormProvider>
  )
}

export default App
