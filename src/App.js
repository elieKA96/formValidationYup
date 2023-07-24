
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';

function App() {

  const yupSchema = yup.object({
    name: yup.string()
    .required('le champ est obligatoire')
    .min(2,'Trop court')
    .max(5, 'Trop long')
    .test('isYes', 'Vous n\'avez pas de chance', async () => {
      const response = await fetch('https://yesno.wtf/api');
      const result =  await response.json();
      console.log(result);
      return result.answer === 'yes';
    })
    ,
    age:yup.number()
    .typeError('Veuillez rentrer un nombre')
    .min(18, 'L\'age doit etre superieur à 18'),
    password: yup
    .string()
    .required("le champ est obligatoire")
    .min(2, 'Trop court')
    .max(5,'Trop long !'),
    confirmPassword: yup
    .string()
    .required('Vous devez confirmer votre mot de passe')
    .oneOf(
      [yup.ref("password"), ""],
      "les mots de passe ne correspondent pas"
    ),
  })
  const {
    handleSubmit, 
    register,
    getValues,
    watch,
    formState : {errors}
  } = useForm({
    defaultValues: {
      name: ""
    },
    resolver:yupResolver(yupSchema),
    mode:"onSubmit" 
  });
  
  //watch("name");

  function submit(value){
    console.log(value);
  }

  console.log(getValues());
  console.log(errors)

  return (
    <div className="d-flex flex-row justify-content-center align-items-center"
    style={{background : "#fefefe", height:"100vh", width:"100%"}}
    >
     <form onClick={handleSubmit(submit)}>
      <div className="d-flex flex-column mb-20">
        <label htmlFor="name">
          Nom
        </label>
        <input {...register("name", {
          //disabled:true
          minLength:{
            value:2,
            message:'Trop court'
          },
        })} type="text" id="name" />

       {errors?.name && <p>{errors?.name.message}</p>}
      </div>
{/**age */}
      <div className="d-flex flex-column mb-20">
        <label htmlFor="Age">
          Age
        </label>
        <input {...register("age", {

        })} 
        type="number" 
        id="age" />

       {errors?.age && <p>{errors?.age.message}</p>}
      </div>

      <div className="d-flex flex-column mb-20">
        <label htmlFor="passeword">
          Mot de passe
        </label>
        <input {...register("password", {

        })} 
        type="password" 
        id="password" />
        
       {errors?.password && <p>{errors?.password.message}</p>}
      </div>
      
      <div className="d-flex flex-column mb-20">
        <label htmlFor="confirmPassword">
        Confirmation mot de passe
        </label>
        <input {...register("confirmPassword", {

        })} 
        type="password" 
        id="confirmPassword" />
        
       {errors?.confirmPassword && <p>{errors?.confirmPassword.message}</p>}
      </div>

      <button className="btn btn-primary">Save</button>
     </form>
    </div>
  );
}

export default App;
