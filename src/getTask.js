const AWS = require('aws-sdk');

const getTask = async (event) => {
    try {
        const {id} = event.pathParameters;
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const {Item} = await dynamodb
            .get({ TableName: 'taskTable', Key: { id  } })
            .promise();
        return {
            status: 200,
            body:  Item,
        };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getTask
}