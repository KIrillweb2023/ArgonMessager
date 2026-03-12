import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function checkTables() {
  try {
    const db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });

    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('Таблицы в базе:', tables.map(t => t.name));

    if (tables.length === 0) {
      console.log('В базе нет таблиц!');
    } else {
      console.log('Найдены таблицы:', tables.map(t => t.name));
      
      if (tables.some(t => t.name === 'Users')) {
        const tableInfo = await db.all("PRAGMA table_info(Users)");
        console.log('Структура таблицы Users:', tableInfo);
      }
    }

    await db.close();
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

checkTables();