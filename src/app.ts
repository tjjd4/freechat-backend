/// <reference path="./types/session.d.ts" />
import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session';
import http from 'http';
import debugLib from 'debug';

import { AppDataSource } from "./orm/data-source"
import { runSeeders } from 'typeorm-extension';

// establish database connection
AppDataSource
  .initialize()
  .then( async () => {
    console.log("Data Source has been initialized!")
    await runSeeders(AppDataSource, {
      seeds: ['./orm/seeding/seeds/*{.ts,.js}'],
      factories: ['./orm/seeding/factories/*{.ts,.js}']
    });
    console.log("Seeding files has been executed!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

// 引入路由
import indexRouter from './routes/index';
import usersRouter from './routes/users';


const debug = debugLib('freechat-backend:server');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 中介軟體設置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 啟用跨域資源共享
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// 禁用 "x-powered-by" 頭信息
app.disable('x-powered-by');

// 啟用 session 支持
app.use(
  session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false, // 僅在 https 環境下使用（開發環境設為 false）
      maxAge: 3600000,
    },
  })
);

// 路由設置
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 處理 404 錯誤
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// 錯誤處理
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// 服務器啟動邏輯
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val; // named pipe
  if (port >= 0) return port; // port number
  return false;
}

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
  debug('Listening on ' + bind);
}

export default app;
