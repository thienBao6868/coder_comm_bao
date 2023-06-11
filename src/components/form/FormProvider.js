import { FormProvider as RHFormProvider } from "react-hook-form";

const FormProvider = ({ children, onSubmit, methods }) => {
  return (
    <RHFormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </RHFormProvider>
  );
};

export default FormProvider;
