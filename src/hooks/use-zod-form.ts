// import { UseMutateFunction } from "@tanstack/react-query";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const useZodForm = (
//   schema: z.ZodSchema,
//   mutation: UseMutateFunction,
//   defaultValues?: any
// ) => {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     reset,
//     watch,
//   } = useForm<z.infer<typeof schema >>({
//     resolver: zodResolver(schema as any),
//     defaultValues: {
//       ...defaultValues,
//     },
//   });

//   const onFormSubmit = handleSubmit(async (values) => mutation({ ...values } as any));
//   return { register, errors, onFormSubmit, reset, watch };
// };

// export default useZodForm;


import { UseMutateFunction } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useZodForm =<T extends z.ZodType> (
  schema: T,
  mutation: UseMutateFunction<any, any , z.infer<T>>,
  defaultValues?: Partial<z.infer<T>>
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const onFormSubmit = handleSubmit((values) => {
    mutation(values);
  }); return { register, errors, onFormSubmit, reset, watch };
};

export default useZodForm;