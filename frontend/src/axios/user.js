import { callAPI } from './axios';


async function loginUser({USER_ID,USER_PW}){
    try {
       const res = await callAPI.post('',{
            query: `
                mutation{
                    login(USER_ID:'${USER_ID}',USER_PW:'${USER_PW}'){
                        USER_TOKEN
                        USER{
                            USER_ID
                            USER_NM
                            USER_EMAIL
                            USER_PHONE
                            USER_CORP
                        }
                    }
                }
            `
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
    
}

export {
    loginUser
}