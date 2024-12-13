import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';

// 引入路由
import indexRouter from './src/routes/index.js';
import usersRouter from './src/routes/users.js';

// 獲取當前文件名和目錄名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 設置視圖引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

// 中介軟體設置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由設置
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 處理 404 錯誤
app.use((req, res, next) => {
  next(createError(404));
});

// 錯誤處理
app.use((err, req, res, next) => {
  // 設置本地變量，只在開發環境中提供錯誤信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染錯誤頁面
  res.status(err.status || 500);
  res.render('error');
});

export default app;
