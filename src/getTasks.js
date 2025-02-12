const  AWS = require('aws-sdk')
const getTasks = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient(); 
        const result = await dynamodb
            .scan({ TableName: 'taskTable' }).promise(); 
        return {
            status: 200,
            body:  result.Items,
        };
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTasks
}