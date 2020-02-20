import cors from 'cors';

export const applyGlobals =(app)=>{
    try{
    app.use(cors())
    }catch(e){
     console.log('Error occurred initializing cors ',e)
    }
}