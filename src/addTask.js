const {v4 } = require('uuid')
const  AWS = require('aws-sdk')

const addTask = async (event) => {
 
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {title, description} =  JSON.parse(event.body);
    const createdAt = new Date();
    const id = v4();

    const newTask = {
        id,
        title,
        description,
        createdAt
    }


    await dynamodb.put({
        TableName: 'taskTable',
        Item: newTask
    }).promise();

    return {
        status: 200,
        body:  newTask,
    };
}

module.exports = {
addTask
}