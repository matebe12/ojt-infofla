import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import {typeDefs} from './gql/gql_schemas';
import {resolvers} from './gql/gql_resolver';

//import {getUser} from './api/test';
//import history from 'connect-history-api-fallback';

const apollo = new ApolloServer({typeDefs, resolvers});
const gqlPath = '/graphql';
//기본 어플 설정
const app = express();
const port = 3000;


//미들웨어 부분
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
apollo.applyMiddleware({app , gqlPath}); //gql 
app.use(morgan('dev')); // log request
app.use(cookieParser());
app.use(express.static('public'));




//app.use(express.static("C:\\upload"));
// app.use(history({
//     index: '/'
// }));

// app.get('/test', async (req, res) => {
//     try {
//         const result = await getUser();
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json(`error => ${error}`);
//     }
// })

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});

