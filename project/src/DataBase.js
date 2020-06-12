import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'RegistrosDatabase.db' });

export const createTable = () => {
  db.transaction(function(txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_register'",
      [],
      function(tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS table_register', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS table_register(register_id INTEGER PRIMARY KEY AUTOINCREMENT, register_identificador VARCHAR(100), register_date VARCHAR(100), register_hour VARCHAR(100), register_lat VARCHAR(100), register_long VARCHAR(100))',
            []
          );
        }
      }
    );
  });  
}

export const insertRegister = (id, date, hour, latitude, longitude, navigation) => {
  db.transaction(function(tx) {
    tx.executeSql(
      'INSERT INTO table_register (register_identificador, register_date, register_hour, register_lat, register_long) VALUES (?,?,?,?,?)',
      [id, date, hour, latitude, longitude],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Successo',
            'Registro feito com sucesso',
            [
              {
                text: 'Ok',
                onPress: () =>
                  navigation.navigate('Home'),
              },
            ],
            { cancelable: false }
          );
        } else {
          alert('Falha no registro');
        }
      }
    );
  });    
}

export const updateRegister = (id, updateId) => {
  db.transaction((tx)=> {
    tx.executeSql(
      'UPDATE table_register set register_identificador=? where register_id=?',
      [id, updateId],
      (tx, results) => {
        console.log('Results',results.rowsAffected);
        if(results.rowsAffected>0){
          Alert.alert( 'Successo', 'O registro foi atualizado',
            [
              {text: 'Ok'},
            ],
            { cancelable: false }
          );
        }else{
          Alert.alert('Falha na atualização');
        }
      }
    );
  });  
}

export const deleteRegister = (deleteId) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM  table_register where register_id=?',
      [deleteId],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Successo',
            'O registro foi excluído',
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert('Falha na remoção');
        }
      }
    );
  });  
}