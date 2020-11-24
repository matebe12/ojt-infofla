import { callAPI } from './axios';


async function getPosts({USER_CORP,CURRENT_PAGE,CATEGORY}){
    try {
       const res = await callAPI.post('',{
            query: `
                query{
                    getPosts(USER_CORP:"${USER_CORP}",CURRENT_PAGE:"${CURRENT_PAGE}", CATEGORY:"${CATEGORY}")
                }
            `
        });
        console.log(res);
        return res.data.data.getPosts;
    } catch (error) {
        console.log(error);
    }
}
async function getPostDetail(POST_NO){
    console.log(POST_NO);
    try {
       const res = await callAPI.post('',{
            query: `
                query{
                    getPostDetail(POST_NO:${POST_NO}){
                        POST_NO
                        POST_TITLE
                        POST_CONTENT
                        POST_FILES
                        POST_WRITER
                        POST_PARENT
                        POST_COMPANY
                        POST_CATEGORY
                        CREATED_DT
                    }
                }
            `
        });
        console.log(res);
        return res.data.data.getPostDetail;
    } catch (error) {
        console.log(error);
    }
}


async function writeboard({POST_COMPANY,POST_TITLE,POST_CONTENT,POST_CATEGORY,POST_WRITER}){
    console.log(POST_COMPANY);
    try {
       const res = await callAPI.post('',{
            query: `
                mutation{
                    createPost
                    (
                    POST_TITLE:"${POST_TITLE}",
                    POST_PARENT: null,
                    POST_WRITER: "${POST_WRITER}"
                    POST_CONTENT:"${POST_CONTENT}",
                    POST_CATEGORY:"${POST_CATEGORY}",
                    POST_COMPANY: ${POST_COMPANY}
                    )
                }
            `
        });
        console.log(res);
        return res.data.data.createPost;
    } catch (error) {
        console.log(error);
    }
}


async function updateBoard({POST_NO,POST_TITLE,POST_CONTENT,POST_CATEGORY}){
    console.log(POST_NO);
    try {
       const res = await callAPI.post('',{
            query: `
                mutation{
                    updatePost
                    (
                    POST_NO:${POST_NO},
                    POST_TITLE:"${POST_TITLE}",
                    POST_CONTENT:"${POST_CONTENT}",
                    POST_CATEGORY:"${POST_CATEGORY}"
                    )
                }
            `
        });
        console.log(res);
        return res.data.data.updatePost;
    } catch (error) {
        console.log(error);
    }
}

async function deleteBoard({POST_NO}){
    console.log(POST_NO);
    try {
       const res = await callAPI.post('',{
            query: `
                mutation{
                    deletePost
                    (
                    POST_NO:${POST_NO}
                    )
                }
            `
        });
        console.log(res);
        return res.data.data.deletePost;
    } catch (error) {
        console.log(error);
    }
}


async function writeComment({REPLY_CONTENT,REPLY_WRITER,POST_NO}){
    console.log(POST_NO);
    try {
       const res = await callAPI.post('',{
            query: `
                mutation{
                    createReply
                    (
                        POST_NO: ${POST_NO},
                        REPLY_WRITER: "${REPLY_WRITER}",
                        REPLY_CONTENT: "${REPLY_CONTENT}"
                    )
                }
            `
        });
        console.log(res);
        return res.data.data.createReply;
    } catch (error) {
        console.log(error);
    }
}

async function getCommentList(POST_NO){
    try {
       const res = await callAPI.post('',{
            query: `
                query{
                    getReply(POST_NO:${POST_NO}){
                        REPLY_NO
                        REPLY_WRITER
                        REPLY_CONTENT
                        REPLY_PARENT
                        CREATED_DT
                        UPDATED_DT
                    }
                }
            `
        });
        console.log(res);
        return res.data.data.getReply;
    } catch (error) {
        console.log(error);
    }
}

async function updateComment({REPLY_CONTENT,REPLY_NO}){
    console.log(REPLY_CONTENT);
    try {
       const res = await callAPI.post('',{
            query: `
                mutation{
                    updateReply
                    (
                    REPLY_NO:${REPLY_NO},
                    REPLY_CONTENT:"${REPLY_CONTENT}"
                    )
                }
            `
        });
        console.log(res);
        return res.data.data.updateReply;
    } catch (error) {
        console.log(error);
    }
}


async function deleteComment({REPLY_NO}){
    console.log(REPLY_NO);
    try {
       const res = await callAPI.post('',{
            query: `
                mutation{
                    deleteReply
                    (
                    REPLY_NO:${REPLY_NO}
                    )
                }
            `
        });
        console.log(res);
        return res.data.data.deleteReply;
    } catch (error) {
        console.log(error);
    }
}



export {
    getPosts,
    getPostDetail,
    updateBoard,
    deleteBoard,
    writeboard,
    writeComment,
    getCommentList,
    updateComment,
    deleteComment
}