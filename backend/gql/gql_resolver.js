import {getSql} from '../config/mariadb';
import {jwtObj} from '../config/jwt';
import GraphQLJSON from 'graphql-type-json';
import jwt from 'jsonwebtoken';

//유니크한 키로 생성한다.
function getJWT(USER_ID){
    return jwt.sign({
        USER_ID: USER_ID,  //페이로드
    },jwtObj.secret);
}

const resolvers = {
    JSON: { //scala 타입 추가
        __serialize(value) {
          return GraphQLJSON.parseValue(value);
        }
    },
    Query: {
        getUsers: async () => {
            let query = 'SELECT * FROM USER_TABLE';
            let result = await getSql(query);
            console.log(result);
            return result;
        },
        getPostDetail: async (_,{POST_NO}) => {
            console.log(POST_NO);
            let query = `
                        SELECT * 
                        FROM 
                        POST_TABLE
                        WHERE POST_NO = ${POST_NO}
                        `;
            let result = await getSql(query);
            console.log(result[0]);
            return result[0];
        },
        getPosts: async (_,reqData) => {
            console.log(reqData.USER_CORP);
            console.log(reqData.CATEGORY);
            
            let CURRENT_PAGE = (reqData.CURRENT_PAGE - 1) * 9;
            let query = `SELECT 
                            POST_NO,
                            POST_TITLE,
                            POST_CONTENT,
                            POST_FILES,
                            POST_WRITER,
                            POST_PARENT,
                            POST_COMPANY,
                            POST_CATEGORY,
                            CREATED_DT
                        FROM
                            POST_TABLE
                        WHERE 
                            POST_COMPANY = ${reqData.USER_CORP}
                        AND POST_CATEGORY = "${reqData.CATEGORY}"`
                        +    
                        `
                        ORDER BY POST_NO DESC
                        LIMIT ${CURRENT_PAGE}, 10        
                        `;
                            
            let result = {
                posts: await getSql(query)
            };
            //페이징 처리를 위한 쿼리
            query = `SELECT 
                            COUNT(*) AS CNT 
                        FROM
                            POST_TABLE
                        WHERE 
                            POST_COMPANY = ${reqData.USER_CORP}      
                        `;
            result.CNT = await getSql(query);
            console.log(result);
            return result;
        },
        getCorps: async () => {
            let query = 'SELECT * FROM CORP_TABLE';
            let result = await getSql(query);
            console.log(result);
            return result;
        },
        getReply: async (_,{POST_NO}) => {
            let query = `SELECT * FROM REPLY_TABLE
                        WHERE POST_NO = ${POST_NO}
            `;
            let result = await getSql(query);
            console.log(result[0]);
            return result;
        },
        
    },
    Mutation:{
        login: async (_, {USER_ID, USER_PW}) => {
            console.log(USER_PW + USER_ID);
            let query = `SELECT
                            USER_NO, 
                            USER_ID,
                            USER_NM,
                            USER_EMAIL,
                            USER_PHONE,
                            USER_CORP
                        FROM 
                            USER_TABLE
                        WHERE 
                            USER_ID='${USER_ID}'
                        AND USER_PW='${USER_PW}'`;
                        try {
                            let result = await getSql(query);
                            console.log('result length :' + result.length);
                            if(result.length === 0){
                                throw new Error('아이디 및 비밀번호를 찾을 수 없습니다.');
                            }
                            console.log(result[0]);
                            result[0].USER_TOKEN = getJWT(result[0].USER_ID);
                            return result[0];
                        } catch (error) {
                            throw error;
                        }
            
        },
        createUser: async (_,{USER_ID,USER_PW,USER_NM,USER_EMAIL,USER_PHONE,USER_CORP}) => {
            let query = `INSERT INTO USER_TABLE
                        (
                            USER_ID, 
                            USER_PW, 
                            USER_NM, 
                            USER_EMAIL, 
                            USER_PHONE,
                            USER_CORP
                        ) 
                        VALUES
                        (
                            '${USER_ID}',
                            '${USER_PW}',
                            '${USER_NM}',
                            '${USER_EMAIL}',
                            '${USER_PHONE}',
                            '${USER_CORP}'
                        )`;
            let result = await getSql(query);
            console.log(result);
            return result.affectedRows;
        },
        updateUser: async (_,reqData) => {
            let query = `UPDATE USER_TABLE SET USER_PW = '${reqData.USER_PW}',
                         USER_NM = '${reqData.USER_NM}', 
                         USER_EMAIL = '${reqData.USER_EMAIL}', 
                         USER_PHONE = '${reqData.USER_PHONE}',
                         USER_CORP = '${reqData.USER_CORP}'
                         WHERE USER_NO = '${reqData.USER_NO}'
                         `;
            let result = await getSql(query);
            console.log(result);
            return result.affectedRows;
        },

        deleteUser: async (_,reqData) => {
            let query = `DELETE FROM 
                            USER_TABLE 
                        WHERE 
                            USER_NO = '${reqData.USER_NO}' 
            `;
            let result = await getSql(query);
            console.log(result);
            return result.affectedRows;
        },

        createPost: async (_,reqData) => {
            let query = `INSERT INTO POST_TABLE
                        (
                            POST_TITLE, 
                            POST_CONTENT,
                            POST_PARENT,
                            POST_WRITER, 
                            POST_CATEGORY,
                            POST_COMPANY
                        ) 
                        VALUES
                        (
                            '${reqData.POST_TITLE}',
                            '${reqData.POST_CONTENT}',
                             ${reqData.POST_PARENT},
                            '${reqData.POST_WRITER}',
                            '${reqData.POST_CATEGORY}', 
                             ${reqData.POST_COMPANY}
                        )`;
            let result = await getSql(query);
            console.log(result);
            return result.affectedRows;
        },
        
        updatePost: async (_,{POST_NO, POST_TITLE, POST_CONTENT, POST_CATEGORY}) => {
            let query = `UPDATE POST_TABLE SET 
                         POST_TITLE = '${POST_TITLE}',
                         POST_CONTENT = '${POST_CONTENT}',
                         POST_CATEGORY = '${POST_CATEGORY}'
                         WHERE POST_NO = ${POST_NO}
                         `;
            try {
                let result = await getSql(query);
                console.log(result);
                return result.affectedRows;
            } catch (error) {
                return error;
            }             
            
        },
        
        deletePost: async (_,{POST_NO}) => {
            let query = `DELETE FROM 
                            POST_TABLE 
                        WHERE 
                            POST_NO = '${POST_NO}' 
            `;
            let result = await getSql(query);
            if(result.affectedRows === 0){
                throw new Error('삭제를 할 수 없습니다.');
            }
            return result.affectedRows;
        },
        
        createCorp: async (_,reqData) => {
            let query = `INSERT INTO CORP_TABLE
                        (
                            CORP_NAME, 
                            COMPANY_REG_NO
                        ) 
                        VALUES
                        (
                            '${reqData.CORP_NAME}',
                            '${reqData.COMPANY_REG_NO}'
                        )`;
            let result = await getSql(query);
            console.log(result);
            return result.affectedRows;
        },
        
        updateCorp: async (_,reqData) => {
            let query = `UPDATE CORP_TABLE 
                        SET 
                            CORP_NAME = '${reqData.CORP_NAME}'
                        WHERE 
                            CORP_ID = ${reqData.CORP_ID}
                         `;
            let result = await getSql(query);
            console.log(result);
            return result.affectedRows;
        },
        
        deleteCorp: async (_,reqData) => {
            let query = `DELETE FROM CORP_TABLE 
                        WHERE 
                            CORP_ID = ${reqData.CORP_ID}
            `;
            let result = await getSql(query);
            console.log(result);
            return result.affectedRows;
        },

        createReply: async (_,reqData) => {
            let query = `INSERT INTO REPLY_TABLE
                        (
                            POST_NO,
                            REPLY_WRITER,
                            REPLY_CONTENT
                        ) 
                        VALUES
                        (
                            ${reqData.POST_NO},
                            '${reqData.REPLY_WRITER}',
                            '${reqData.REPLY_CONTENT}'
                        )`;
            let result = await getSql(query);
            console.log(result);
            return result.affectedRows;
        },
        
        updateReply: async (_,reqData) => {
            let query = `UPDATE REPLY_TABLE 
                        SET 
                            REPLY_CONTENT = '${reqData.REPLY_CONTENT}'
                        WHERE 
                            REPLY_NO = ${reqData.REPLY_NO}
                         `;
            let result = await getSql(query);
            console.log(result);
            return result.affectedRows;
        },
        
        deleteReply: async (_,reqData) => {
            let query = `DELETE FROM REPLY_TABLE 
                            WHERE 
                            REPLY_NO = ${reqData.REPLY_NO}
                        `;
            let result = await getSql(query);
            console.log(result);
            return result.affectedRows;
        },
    }
}

export{resolvers};