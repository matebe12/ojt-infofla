import {gql} from 'apollo-server-express';
//쿼리 및 타입, 함수 요청파라미터 정의
 



// scala type JSON 추가
const typeDefs = gql`

    scalar JSON

     type Query{
        getUsers : [User]
        getPosts(USER_CORP:String CURRENT_PAGE:String CATEGORY:String) : JSON
        getCorps : [Corp]
        getReply(POST_NO:Int) : [Reply]
        getPostDetail(POST_NO:Int) : Post                
     }
     
     type User {
        USER_NO: ID!
        USER_ID: String!
        USER_PW: String!
        USER_NM: String
        USER_EMAIL: String!
        USER_PHONE: String!
        USER_CORP: String!
     }

     type UserResult{
        USER_NO: ID!
        USER_ID: String!
        USER_PW: String!
        USER_NM: String
        USER_EMAIL: String!
        USER_PHONE: String!
        USER_CORP: String!
        USER_TOKEN: String!
     }
     
     type Post {
        POST_NO: ID!
        POST_TITLE: String!
        POST_CONTENT: String!
        POST_FILES: String
        POST_WRITER: String!
        POST_PARENT: Int
        POST_COMPANY: Int!
        POST_CATEGORY: String!
        CREATED_DT:String
     }
     
     type Corp {
        CORP_ID: ID!
        CORP_NAME: String!
        COMPANY_REG_NO: String!
     }
     
     type Reply {
        REPLY_NO: ID!
        REPLY_WRITER: String!
        REPLY_CONTENT: String!
        REPLY_PARENT: Int
        CREATED_DT: String
        UPDATED_DT: String
     }

    type Mutation{
        
        login(
            USER_ID: String!
            USER_PW: String!
            
        ): UserResult!
    
        createUser(
            USER_ID: String!
            USER_PW: String!
            USER_NM: String
            USER_EMAIL: String!
            USER_PHONE: String!
            USER_CORP: String!
        ): Int!
        
        updateUser(
            USER_NO: Int!
            USER_ID: String!
            USER_PW: String!
            USER_NM: String
            USER_EMAIL: String!
            USER_PHONE: String!
            USER_CORP: Int!
        ): Int!
        
        deleteUser(
            USER_NO: Int!
        ): Int!
        
        createPost(
            POST_TITLE: String!
            POST_CONTENT: String!
            POST_PARENT: Int
            POST_WRITER: String!
            POST_CATEGORY: String!
            POST_COMPANY: Int!
        ): Int!
        
        updatePost(
            POST_NO: Int!
            POST_TITLE: String!
            POST_CONTENT: String!
            POST_CATEGORY: String!
        ): Int!
        
        deletePost(
            POST_NO: Int!
        ): Int!
        
        createCorp(
            CORP_NAME: String!
            COMPANY_REG_NO: String!
        ): Int!
        
        updateCorp(
            CORP_ID: Int!
            CORP_NAME: String!
        ): Int!
        
        deleteCorp(
            CORP_ID: Int!
        ): Int!
        
        createReply(
            POST_NO: Int!
            REPLY_WRITER: String!
            REPLY_CONTENT: String!
        ): Int!
        
        updateReply(
            REPLY_NO: Int!
            REPLY_CONTENT: String!
        ): Int!
        
        deleteReply(
            REPLY_NO: Int!
        ): Int!
    }
`;

export {
    typeDefs
}