const mysql = require("mysql2");
// 1.创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "blogservice", //数据库的名字
  user: "root",
  password: "Coder123.",
  connectionLimit: 5,
});

// 2.判断下链接池是否成功
connectionPool.getConnection((err, connection) => {
  // 1.判断是否有错误信息
  if (err) {
    console.log("获取链接失败" + err);
    return;
  }
  // 2.获取connection,尝试和数据库建立一下链接
  connection.connect((err) => {
    if (err) {
      console.log("数据库交互失败", err);
    } else {
      console.log("数据库连接成功, 可以操作数据库~");
    }
  });
});

// 3.获取连接池中的连接对象（异步形式）
const connect = connectionPool.promise();



// 开启了事务
// 事务是指一组SQL语句的集合，这些SQL语句必须全部执行成功或全部执行失败。在一个事务中，如果有任何一条SQL语句执行失败，
// 则所有的SQL语句都会被撤销，回滚到事务开始前的状态。如果所有的SQL语句都执行成功，则所有的操作都会被提交，保存到数据库中
// 针对多条sql语句，要不全部成功，要不全部失败
async function transaction(callback) {
  const connection = await connect.getConnection(); // 获取mysql连接，从连接池中拉取一个连接
  try {
    await connection.beginTransaction(); // 开启事务
    const result = await callback(connection);
    await connection.commit(); // 提交事务
    return result;
  } catch (error) {
    await connection.rollback(); // 回滚事务
    throw error;
  } finally {
		// 释放连接
    connection.release();
  }
}

async function query(connection, sql, params) {
  const [result] = await connection.execute(sql, params);
  return result;
}

module.exports = {
	connect,
  transaction,
  query
};
